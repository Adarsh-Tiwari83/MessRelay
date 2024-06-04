import { useState } from 'react';
import './CreateHostel.scss';
import { useDispatch } from 'react-redux';
import { addHostel } from '../../Actions/admin';
import { useNavigate } from 'react-router-dom';

const CreateHostel = () => {
    const [formData, setFormData] = useState({
        name: '',
        warden: '',
        accountant: '',
        messMenu: {
            sunday: {
                breakfast: { items: [''] },
                lunch: { items: [''] },
                snacks: { items: [''] },
                dinner: { items: [''] }
            },
            monday: {
                breakfast: { items: [''] },
                lunch: { items: [''] },
                snacks: { items: [''] },
                dinner: { items: [''] }
            },
            tuesday: {
                breakfast: { items: [''] },
                lunch: { items: [''] },
                snacks: { items: [''] },
                dinner: { items: [''] }
            },
            wednesday: {
                breakfast: { items: [''] },
                lunch: { items: [''] },
                snacks: { items: [''] },
                dinner: { items: [''] }
            },
            thursday: {
                breakfast: { items: [''] },
                lunch: { items: [''] },
                snacks: { items: [''] },
                dinner: { items: [''] }
            },
            friday: {
                breakfast: { items: [''] },
                lunch: { items: [''] },
                snacks: { items: [''] },
                dinner: { items: [''] }
            },
            saturday: {
                breakfast: { items: [''] },
                lunch: { items: [''] },
                snacks: { items: [''] },
                dinner: { items: [''] }
            }
        }
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleItemChange = (e, day, mealType, index) => {
        const { value } = e.target;
        setFormData(prevState => {
            const updatedItems = [...prevState.messMenu[day][mealType].items];
            updatedItems[index] = value;
            return {
                ...prevState,
                messMenu: {
                    ...prevState.messMenu,
                    [day]: {
                        ...prevState.messMenu[day],
                        [mealType]: {
                            ...prevState.messMenu[day][mealType],
                            items: updatedItems
                        }
                    }
                }
            };
        });
    };

    const handleAddItem = (day, mealType) => {
        setFormData(prevState => ({
            ...prevState,
            messMenu: {
                ...prevState.messMenu,
                [day]: {
                    ...prevState.messMenu[day],
                    [mealType]: {
                        ...prevState.messMenu[day][mealType],
                        items: [...prevState.messMenu[day][mealType].items, '']
                    }
                }
            }
        }));
    };

    const handleRemoveItem = (day, mealType, index) => {
        setFormData(prevState => {
            const updatedItems = [...prevState.messMenu[day][mealType].items];
            updatedItems.splice(index, 1);
            return {
                ...prevState,
                messMenu: {
                    ...prevState.messMenu,
                    [day]: {
                        ...prevState.messMenu[day],
                        [mealType]: {
                            ...prevState.messMenu[day][mealType],
                            items: updatedItems
                        }
                    }
                }
            };
        });
    };
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        dispatch(addHostel(formData.name, formData.warden, formData.accountant, formData.messMenu));
        navigate('/admin');
    };
    const backHandler = () => {
        navigate('/admin');
    }

    return (
        <div className="create-hostel-container">
            <h2>Create Hostel</h2>
            <button className="backButton" onClick={backHandler}>Back</button>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="warden">Warden:</label>
                    <input type="text" id="warden" name="warden" value={formData.warden} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="accountant">Accountant:</label>
                    <input type="text" id="accountant" name="accountant" value={formData.accountant} onChange={handleChange} required />
                </div>
                {/* Mess menu input fields */}
                {Object.entries(formData.messMenu).map(([day, meals]) => (
                    <div key={day}>
                        <h3>{day.charAt(0).toUpperCase() + day.slice(1)}</h3>
                        {Object.entries(meals).map(([mealType, { items }]) => (
                            <div key={mealType}>
                                <h4>{mealType.charAt(0).toUpperCase() + mealType.slice(1)}</h4>
                                {items.map((item, index) => (
                                    <div key={index} className="item-input">
                                        <input
                                            type="text"
                                            value={item}
                                            placeholder="Enter item name"
                                            onChange={(e) => handleItemChange(e, day, mealType, index)}
                                        />
                                        <button type="button" onClick={() => handleRemoveItem(day, mealType, index)}>Remove</button>
                                    </div>
                                ))}
                                <button type="button" onClick={() => handleAddItem(day, mealType)}>Add More</button>
                            </div>
                        ))}
                    </div>
                ))}
                <button type="submit">Create Hostel</button>
            </form>
        </div>
    );
};

export default CreateHostel;