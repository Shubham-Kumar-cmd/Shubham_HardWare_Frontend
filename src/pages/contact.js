import Base from "../components/Base";

function Contact(){
    return (
        <Base 
        title="Contact Shubham hardware" 
        description={null}// {"we are value of our customer."}
        buttonEnabled={"true"}
        buttonLink="/"
        buttonText="Home"
        buttonType="warning"
        >
            <div>This is Contact Page</div>
        </Base>
    );
}

export default Contact;