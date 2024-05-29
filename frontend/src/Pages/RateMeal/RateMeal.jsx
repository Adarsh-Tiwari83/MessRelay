
import { useDispatch, useSelector } from 'react-redux';
import { loadUser, rateMeal } from '../../Actions/user';

const RateMeal = () => {
    const { user } = useSelector(state => state.user);
    const today = new Date().toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase(); // Get today's day in lowercase format
    const meals = user.hostel.messMenu[today]; // Get today's meals
    const dispatch=useDispatch();
    const handleRatingClick = async(mealType, rating) => {
        // Handle rating click
        console.log(`Clicked ${rating} for ${mealType}`);
        await dispatch(rateMeal(mealType, rating));
        await dispatch(loadUser());
    };

    return (
        <div className='container'>
            <h2>{today.toUpperCase()}&apos;S MEALS</h2>
            <div className="meal-cards">
                {Object.keys(meals).map((mealType, index) => {
                    if (mealType !== "_id") {
                        return (
                            <div className="card" key={index}>
                                <h3>{mealType}</h3>
                                <p>Items : {meals[mealType].items.join(', ')}</p>
                                <div className="ratings">
                                    <button className="rating" onClick={() => handleRatingClick(mealType, 'good')}>
                                        <span>Good</span>
                                        <span>{meals[mealType].rating.length>0?(meals[mealType].rating.filter(item=>item.value==='good').length)*100/(meals[mealType].rating.length):0}%</span> {/* Example percentage, you can replace with actual data */}
                                    </button>
                                    <button className="rating" onClick={() => handleRatingClick(mealType, 'average')}>
                                        <span>Average</span>
                                        <span>{meals[mealType].rating.length > 0 ?(meals[mealType].rating.filter(item => item.value === 'average').length) * 100 / (meals[mealType].rating.length):0}%</span> {/* Example percentage, you can replace with actual data */}
                                    </button>
                                    <button className="rating" onClick={() => handleRatingClick(mealType, 'bad')}>
                                        <span>Bad</span>
                                        <span>{meals[mealType].rating.length > 0 ?(meals[mealType].rating.filter(item => item.value === 'bad').length) * 100 / (meals[mealType].rating.length):0}%</span> {/* Example percentage, you can replace with actual data */}
                                    </button>
                                </div>
                            </div>
                        );
                    }
                    return null;
                })
}
            </div>
        </div>
    );
};

export default RateMeal;
