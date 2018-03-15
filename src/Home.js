import React from 'react';

const Greeting =(userName) => {
    console.log('greeting');
    if (userName === null){
        console.log('no user');
        return (<div></div>);    
    }
    else{
        console.log(userName);
        return (<div><p>Welcome {userName}</p></div>);
    }
}


class Home extends React.Component {
    render() {
        console.log('received', this.props.userName);
        return (
            <div>
                <h1>Home page</h1>
               
            </div>
        );
    }
}

export default Home;