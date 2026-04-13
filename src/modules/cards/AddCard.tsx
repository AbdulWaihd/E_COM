import { useState } from 'react';
import { TextInput } from '../../Shared/input-forms/TextInput';
import Button from '../../Shared/components/Button';

import { useNavigate } from 'react-router-dom';
const AddCard = () => {
    const navigate = useNavigate();
    const [Item, setItem] = useState(() => ({
        id: Math.floor(Math.random() * 1000000),
        title: '',
        price: 0,
        description: '',
        category: '',
        image: '',
        rating: ''
    }));

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setItem({ ...Item, [e.target.id]: e.target.value });
    };

    const handleSubmit = () => {
    const existing = JSON.parse(localStorage.getItem('products') || '[]')
    localStorage.setItem('products', JSON.stringify([...existing, Item]))
    navigate('/home')
  };
    return (
        <div className="flex flex-col items-center p-8"
            style={{ backgroundColor: 'var(--background)' }}>

            <h1 className="text-2xl font-bold mb-6"
                style={{ color: 'var(--text)' }}>
                Add New Product
            </h1>


            <TextInput
                label="Title"
                id="title"
                placeholder="Enter product title"
                value={Item.title}
                onChange={handleChange}
            />

            <TextInput
                label="Price"
                id="price"
                type="number"
                placeholder="Enter price"
                value={Item.price}
                onChange={handleChange}
            />

            <TextInput
                label="Description"
                id="description"
                placeholder="Enter description"
                value={Item.description}
                onChange={handleChange}
            />

            <TextInput
                label="Image URL"
                id="image"
                placeholder="Enter image URL"
                value={Item.image}
                onChange={handleChange}
            />

            <TextInput
                label="Rating"
                id="rating"
                placeholder="Enter rating"
                value={Item.rating}
                onChange={handleChange}
            />

            <Button
                btnTxt="Add Product"
                type="submit"
                onClick={handleSubmit}
                style={{ backgroundColor: 'var(--cta)', color: 'var(--text)' }}
                className="mt-4 py-2 px-8 rounded-full text-sm font-semibold cursor-pointer border-none"
            />


        </div>
    );
};

export default AddCard;