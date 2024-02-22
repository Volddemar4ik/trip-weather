import { getIconUrl } from "../functions";

export default function Icon({ iconName }) {
    const iconUrl = getIconUrl(iconName)

    return <img
        src={iconUrl}
        alt={iconName}
        title={iconName}
    />
}