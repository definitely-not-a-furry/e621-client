import {View,Text} from "react-native";
import { defaultDark, classic } from "../themes/default";
import { Score, FavCount, Rating } from "./Components";

export const ScoreBar = ({post}) => {
    const style = defaultDark
    return (
    <View>
        <View style={[style.container,{flexDirection: 'row',justifyContent: "flex-start"}]}>
            <Text style={style.containerText}><Score score={post.score.total}/></Text>
            <Text style={[style.containerText,{padding:5}]}><FavCount favCount={post.fav_count}/></Text> 
            <Text style={style.containerText}>Rating: <Rating rating={post.rating}/></Text>
        </View>
    </View>
    )
}