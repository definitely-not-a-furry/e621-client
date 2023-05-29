import {Text,View} from "react-native";
import { defaultDark, classic } from "../themes/default";

async function goToPost(postid) {
    console.log(postid)
    router.push({pathname:'/postview',params:{id:postid}})
};

const Relations = ({post}) => {
    const style = defaultDark
    return(
        <View>
            {post.relationships.parent_id && <View style={[style.container,{marginBottom:7}]}><Text style={[style.containerText,{fontWeight:800}]}>Parent:</Text><TouchableOpacity onPress={()=>goToPost(post.relationships.parent_id)}><Text style={style.containerText}>post #{post.relationships.parent_id}</Text></TouchableOpacity></View>}
            {post.relationships.has_children && <View style={[style.container,{marginBottom:7}]}><Text style={[style.containerText,{fontWeight:800}]}>Children:</Text>{post.relationships.children.map(postid=>(<TouchableOpacity key={postid} onPress={()=>goToPost(post.relationships.parent_id)}><Text style={style.containerText}>post #{postid}</Text></TouchableOpacity>))}</View>}
        </View>
    )
}

export {Relations};