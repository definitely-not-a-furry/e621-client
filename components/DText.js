import { defaultDark, classic } from '../themes/default';
import {Text,View} from 'react-native';

const DText = ({text}) => {
    // Regex pattern to match supported tags
    const pattern = /(\[[^\]]*\].*?\[[^\]]*\])/
    const parts = text.split(pattern);
    const styledParts = parts.map((part, index) => {
        if (part.match(pattern)) {
            content = part.match(/\[[^\]]*\](.*?)\[[^\]]*\]/)[1]
            tag = part.match(/\[([^\]]*)*\].*?\[[^\]]*\]/)[1]
            let style = defaultDark.containerText;
            let viewStyle={};
            if (tag == 'b') {
                style = {fontWeight: 'bold'};
            } else if (tag == 'i') {
                style = {fontStyle: 'italic'};
            } else if (tag == 's') {
                style={textDecorationLine: 'line-through'};
            } else if (tag == 'quote') {
                viewStyle=defaultDark.quote;
            } else {content = `[${tag}]${content}[/${tag}]`}
            return (<View style={viewStyle}><Text key={index} style={[style,defaultDark.containerText]}>{content}</Text></View>);
        }
        return <Text key={index}>{part}</Text>;
    });
    return <Text>{styledParts}</Text>;
};

export default DText;

