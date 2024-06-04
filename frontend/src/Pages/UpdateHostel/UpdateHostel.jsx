import { useState } from 'react';
import './UpdateHostel.scss';
import { useDispatch } from 'react-redux';
import { updateHostel } from '../../Actions/admin';

const UpdateHostel = ({hostel,setIsEditClicked}) => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        name: hostel?.name || '',
        warden: hostel?.warden ||'',
        accountant: hostel?.accountant ||'',
        messMenu:  ({
            sunday: {
                breakfast: hostel?.messMenu?.sunday?.breakfast || { items: [''] },
                lunch: hostel?.messMenu?.sunday?.lunch || { items: [''] },
                snacks:  hostel?.messMenu?.sunday?.snacks || { items: [''] },
                dinner: hostel?.messMenu?.sunday?.dinner || { items: [''] }
            },
            monday: {
                breakfast: hostel?.messMenu?.monday?.breakfast || { items: [''] },
                lunch: hostel?.messMenu?.monday?.lunch || { items: [''] },
                snacks:    hostel?.messMenu?.monday?.snacks || { items: [''] },
                dinner: hostel?.messMenu?.monday?.dinner || { items: [''] }
            },
            tuesday: {
                breakfast: hostel?.messMenu?.tuesday?.breakfast || { items: [''] },
                lunch: hostel?.messMenu?.tuesday?.lunch || { items: [''] },
                snacks: hostel?.messMenu?.tuesday?.snacks || { items: [''] },
                dinner: hostel?.messMenu?.tuesday?.dinner || { items: [''] }
            },
            wednesday: {
                breakfast: hostel?.messMenu?.wednesday?.breakfast || { items: [''] },
                lunch: hostel?.messMenu?.wednesday?.lunch || { items: [''] },
                snacks: hostel?.messMenu?.wednesday?.snacks || { items: [''] },
                dinner: hostel?.messMenu?.wednesday?.dinner || { items: [''] }
            },
            thursday: {
                breakfast: hostel?.messMenu?.thursday?.breakfast || { items: [''] },
                lunch: hostel?.messMenu?.thursday?.lunch || { items: [''] },
                snacks: hostel?.messMenu?.thursday?.snacks || { items: [''] },
                dinner: hostel?.messMenu?.thursday?.dinner || { items: [''] }
            },
            friday: {
                breakfast: hostel?.messMenu?.friday?.breakfast || { items: [''] },
                lunch: hostel?.messMenu?.friday?.lunch || { items: [''] },
                snacks: hostel?.messMenu?.friday?.snacks || { items: [''] },
                dinner: hostel?.messMenu?.friday?.dinner || { items: [''] }
            },
            saturday: {
                breakfast: hostel?.messMenu?.saturday?.breakfast || { items: [''] },
                lunch: hostel?.messMenu?.saturday?.lunch || { items: [''] },
                snacks: hostel?.messMenu?.saturday?.snacks || { items: [''] },
                dinner: hostel?.messMenu?.saturday?.dinner || { items: [''] }
            }
        })
    });
    console.log(hostel);

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

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        dispatch(updateHostel(hostel._id, formData.name, formData.warden, formData.accountant, formData.messMenu));
        setIsEditClicked(false);
        window.location.reload();
    };

    return (
        <div className="create-hostel-container">
            <h2>{hostel?.name}</h2>
            <button className="editBackButton" onClick={() => setIsEditClicked(false)}>Back</button>
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
                <button type="submit">Update Hostel Details</button>
            </form>
        </div>
    );
};

export default UpdateHostel;