import { Text, View } from 'react-native'
import { stylestr } from '../themes/default'
import { Rating, toTheme } from './Components'

const InfoView = ({post}) => {
    const style = toTheme(stylestr)
    return(
        <View style={style.container}>
            <Text style={style.containerText}>
                <Text style={{fontWeight: 500}}>{`ID: `}<Text style={{fontWeight: 200}}>{post.id}</Text></Text>{'\n'}
                <Text style={{fontWeight: 500}}>{`Rating: `}<Text>{Rating({rating:post.rating})}</Text></Text>{'\n'}
                <Text style={{fontWeight: 500}}>{`Dimensions: `}<Text style={{fontWeight: 200}}>{`${post.file.width}x${post.file.height} pixels`}</Text></Text>{'\n'}
                <Text style={{fontWeight: 500}}>{`Uploader : `}<Text style={{fontWeight: 200}}>{post.uploader_id}</Text></Text>{'\n'}
                <Text style={{fontWeight: 500}}>{`Votes: \n`}
                <Text style={[{fontWeight: 500},style.positive]}>{`\tUp: `}<Text style={{fontWeight: 200, color: '#fff'}}>{post.score.up}</Text></Text>{`\n`}
                <Text style={[{fontWeight: 500},style.negative]}>{`\tDown: `}<Text style={{fontWeight: 200, color: '#fff'}}>{post.score.down}</Text></Text>
                </Text>
            </Text>
        </View>
    )
}

export {InfoView};