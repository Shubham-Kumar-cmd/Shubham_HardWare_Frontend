import Base from "../components/Base";

function About(){
    return (
        <Base 
        title="About Shubham Hardware"
        description="we are providing all kinds of construction material"
        buttonEnabled={"true"}
        buttonLink="/"
        buttonText="Home"
        buttonType="warning"
        >
            this is About page;
        </Base>
    );
}

export default About;