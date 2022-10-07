import Link from "next/link";
import { ImageContainer, SucessContainer } from "../styles/pages/sucess";

export default function Success() { 
  return (
    <SucessContainer>
      <h1>Compra efetuada!</h1>

      <ImageContainer>

      </ImageContainer>

      <p>
      Uhuul <strong>Diego Fernandes</strong>, sua <strong>camiseta Ignite</strong> já está a caminho da sua casa. 
      </p>

      <Link href="/">
        Voltar ao catálogo
      </Link>
    </SucessContainer>
  )
}