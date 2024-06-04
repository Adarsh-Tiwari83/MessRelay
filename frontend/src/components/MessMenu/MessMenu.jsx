
import './MessMenu.scss'



const MessMenu = ({messMenu}) => {
    const daysOfWeek = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
    return (
        <div className="MessMenu">
            <h1>Mess Menu</h1>
            <table border="1">
                <thead>
                    <tr>
                        <th>Day</th>
                        <th>Breakfast</th>
                        <th>Lunch</th>
                        <th>Snacks</th>
                        <th>Dinner</th>
                    </tr>
                </thead>
                <tbody>
                    {daysOfWeek?.map(day => (
                        <tr key={day}>
                            <td>{day?.charAt(0).toUpperCase() + day?.slice(1)}</td>
                            <td>{messMenu[day]?.breakfast?.items?.join(", ")}</td>
                            <td>{messMenu[day]?.lunch?.items?.join(", ")}</td>
                            <td>{messMenu[day]?.snacks?.items?.join(", ")}</td>
                            <td>{messMenu[day]?.dinner?.items?.join(", ")}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MessMenu;