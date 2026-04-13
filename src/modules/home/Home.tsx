import { useEffect, useState } from "react"
import Card from "./components/Card"
import type { CardProps } from "./components/Card" 
import axios from "axios" 

const Home = () => {
    const [cards, setCards] = useState<CardProps[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res= await axios.get("/product.data.json")
                console.log(res.data?.products)
                setCards(res.data?.products||[])
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };
        fetchData();
    }, [])

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-6">
            {cards.length === 0 ? (
                <p className="text-sm col-span-4 text-center"
                    style={{ color: 'var(--text)' }}>
                    No products yet. Add some!
                </p>
            ) : (
                cards.map((item) => (
                    <Card
            key={item.id}
            id={item.id}
            title={item.title}
            category={item.category}
            brand={item.brand}
            original_price={item.original_price}
            discounted_price={item.discounted_price}
            rating={item.rating}
            stock={item.stock}
            description={item.description}
            image={item.image}
          />
                ))
            )}
        </div>
    )
}

export default Home;