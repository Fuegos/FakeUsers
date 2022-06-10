export default function User(props) {
    return(
        <tr>
            <th scope="row">{props.numRow}</th>
            <td>{props.user._id}</td>
            <td>{props.user.fullName}</td>
            <td>{props.user.address}</td>
            <td>{props.user.phone}</td>
        </tr>
    )
}