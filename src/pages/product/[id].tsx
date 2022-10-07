import axios from "axios"
import { GetStaticPaths, GetStaticProps } from "next"
import Image from "next/future/image"
import Head from "next/head"
import Router, { useRouter } from "next/router"
import { useState } from "react"
import Stripe from "stripe"
import { stripe } from "../../lib/sripe"
import { ImageContainer, ProductContainer, ProductDetails } from "../../styles/pages/product"

interface ProductProps {
  product: {
    id: string;
    name: string;
    imageUrl: string;
    price: string;
    description: string;
    defaultPriceId: string;
  }
}

interface Language {
  type: 'pt' | 'en' | 'es';
}

export default function Product({ product } : ProductProps) {
  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] = useState(false)
  //const router = useRouter();

  const [language, setLanguage] = useState<Language>()

  async function handleBuyProduct() {
    try {
      setIsCreatingCheckoutSession(true)

      const response = await axios.post('/api/checkout', {
        priceId: product.defaultPriceId,
      })

      const { checkoutUrl } = response.data

      // redirecionar o usuário para a sessão do checkout com URL INTERNA
      //router.push('/checkout')

      // redirecionar o usuário para a sessão do checkout com url EXTERNA
      window.location.href = checkoutUrl
    } catch (error) {
      setIsCreatingCheckoutSession(false)
      console.log(error)
      alert('Falha ao comprar o produto.')
    }
  }
  
  const { isFallback } = useRouter()

  //TODO: Criar loading screen
  if(isFallback){
    return <p>Carregando...</p>
  }

  return (
    <>
      <Head>
        <title>{product.name} | Ignite Shop</title>
      </Head>
      <ProductContainer>
        <ImageContainer>
          <Image src={product.imageUrl} width={520} height={400} alt=""/>
        </ImageContainer>

        <ProductDetails>
          <h1>{product.name}</h1>

          <span>{product.price}</span>

          <p>{product.description}.</p>

          <button
            disabled={isCreatingCheckoutSession}
            onClick={handleBuyProduct
          }>
            Comprar agora
          </button>
        </ProductDetails>
      </ProductContainer>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      { params: { id: 'prod_MQ9Y1LJe2DRte8' } }
    ],
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({ params }) => {

  const productId = params.id;

  const product = await stripe.products.retrieve(productId, {
    expand: ['default_price'],
  });

  const price = product.default_price as Stripe.Price;

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        price: new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }).format(price.unit_amount / 100),
        description: product.description,
        defaultPriceId: price.id,
      }
    },
    revalidate: 60 * 60 * 1 // 1 hour
  }
}