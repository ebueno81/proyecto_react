import{useState, useEffect} from "react"
import { db } from "../data/db"
import { Header } from "../components/header"

const useCart = () =>{

    const initialCart = () =>{
        const localStorageCart = localStorage.getItem('cart')
        return localStorageCart ? JSON.parse(localStorageCart) : []
      }

      const data = db
      
      const [cart,setCart] = useState(initialCart)
    
      const MIN_ITEMS = 1
      const MAX_ITEMS = 10
    
    
      useEffect(()=>{
        localStorage.setItem('cart',JSON.stringify(cart))
      },[cart])
      
      function addToCart(item){
    
        const itemExist = cart.findIndex(automovil => automovil.id === item.id)
        
        if (itemExist>=0){
            const updatedCart = [...cart]
            updatedCart[itemExist].quantity++;
            setCart(updatedCart)
        }else{
            item.quantity = 1
            setCart([...cart,item]) 
        }
    
        //console.log('agregando al carrito...',item)
      }
      
      function removeFromCart(idEliminar){
        setCart(preCart => preCart.filter(automovil => automovil.id !== idEliminar ))
      }
    
      function decreaseQuantity(id){
        const updatedCart = cart.map(item => {
          if (item.id === id && item.quantity > MIN_ITEMS) {
            return{
              ...item,
              quantity: item.quantity-1
            }
          }
          return item
        })
        setCart(updatedCart)
      }
    
      function increaseQuantity(id){
        const updatedCart = cart.map(item => {
          if (item.id === id && item.quantity < MAX_ITEMS){
            return {
              ...item, quantity: item.quantity + 1
            }
          }
          return item
        })
        setCart(updatedCart)
      }
    
      function clearCart(){
        setCart([])
      }

      const cartTotal = cart.reduce((total,{quantity,price})=>{return total + (quantity*price)},0)

    return{
        data,
        cart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        cartTotal
    }
        

    
}



export {useCart}