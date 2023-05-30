import {Text} from "react-native";
import { defaultDark, classic } from "../themes/default";
import DText from "./DText";
import { Image } from "expo-image";

const style = defaultDark

const Rating = ({rating}) => {
    if(rating == 's'){
        return(<Text style={[style.positive,{padding:10,fontWeight:700}]}>Safe</Text>);
    }else if(rating == 'e'){
        return(<Text style={[style.explicit,{padding:10,fontWeight:700}]}>Explicit</Text>);
    }else if(rating == 'q'){
        return(<Text style={[style.questionable,{padding:10,fontWeight:700}]}>Questionable</Text>)
    } else return(<Text>error</Text>)
}

const Score = ({score}) => {
    if(score>0){
        return(<Text style={style.positive}>↑{score}</Text>);
    }else if(score==0){
        return(<Text style={style.neutral}>↕{score}</Text>);
    }else{
        return(<Text style={style.negative}>↓{score}</Text>);
    }
}

const FavCount = ({favCount}) => {
    return(
        <Text style={style.containerText}>{favCount}♥</Text>
    )
}

const Description = ({description}) => {
    {description && 
    <View style={style.container}>
            <Text style={[style.containerText,{fontWeight: 700, paddingBottom: 1}]}>Description:</Text>
            <DText text={description}/>
    </View>
    }
}

const PostImage = ({ post }) => {
    if (!post?.id) return <Text style={{color:'#fff'}}>Loading...</Text>;
    const fileExtension = post.file.ext;
    if (fileExtension === 'jpg' || fileExtension === 'png' || fileExtension === 'gif') {
        return <Image source={{ uri: post.file.url }} style={[style.image,{marginVertical:5}]} />;
    } else {
        return <Text>{`This file type (".${fileExtension}") is not supported (yet).`}</Text>;
    }
};

const PostComments = ({postId}) => {
    const [comments, setComments] = useState([])

    const fetchComments = () => {
        fetch(`https://e621.net/comments.json?group_by=comment&search[post_id]=${postId}`)
            .then(response => response.json())
            .then(data => setComments(data))
            .catch(error => console.error(error));
    }

    return (<View style={style.container}></View>)
}

export {
    Rating,
    Score,
    FavCount,
    Description,
    PostImage
};