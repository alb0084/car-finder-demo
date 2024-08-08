
import { Text } from 'native-base';


const HighlightText = ({ text, query }) => {
    if (!text) return null;
    if (!query) return text;

    const parts = text?.split(new RegExp(`(${query})`, 'gi'));
    return parts.map((part, index) => (
        <Text key={index} color={part.toLowerCase() === query.toLowerCase() ? 'red.500' : 'black'}>
            {part}
        </Text>
    ));
};

export default HighlightText;