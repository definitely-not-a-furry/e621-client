import {Text} from 'react-native';

const UserName = ({ userData }) => {

    const levelColor = (userData) => {
        level_string = userData.level_string
        uname = userData.name
        if(level_string=="Member"){
            return(<Text style={{color:'#b4c7d9'}}>{uname}</Text>)
        } else if(level_string=="Privileged"){
            return(<Text style={{color:'#b4c7d9'}}>{uname}</Text>)
        } else if(level_string=="Blocked"){
            return(<Text style={{color:'#b4c7d9'}}>{uname}</Text>)
        } else if(level_string=="Former Staff"){
            return(<Text style={{color:'#78dca5'}}>{uname}</Text>)
        } else if(level_string=="Janitor"){
            return(<Text style={{color:'#d82828'}}>{uname}</Text>)
        } else if(level_string=="Moderator"){
            return(<Text style={{color:'#d82828'}}>{uname}</Text>)
        } else if(level_string=="Admin"){
            return(<Text style={{color:'#e69500'}}>{uname}</Text>)
        }
    }

    return(
        <Text>
            <Text>{levelColor(userData)}</Text>{'\n'}
            <Text style={{color:'#fff'}}>{userData.level_string}</Text>
        </Text>
    )
}

export default UserName