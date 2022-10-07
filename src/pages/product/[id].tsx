import { useRouter } from "next/router"
import { ImageContainer, ProductContainer, ProductDetails } from "../../styles/pages/product"

export default function Product() {
  const { query } = useRouter()

  return (
    <ProductContainer>
      <ImageContainer>

      </ImageContainer>

      <ProductDetails>
        <h1>Camiseta X</h1>

        <span>R$ 61,65</span>

        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur neque cupiditate quos illo, quaerat, eius reprehenderit quidem facere hic possimus sapiente vel quo architecto iure! Reiciendis voluptas voluptatum assumenda recusandae.</p>

        <button>Comprar agora</button>
      </ProductDetails>
    </ProductContainer>
  )
}