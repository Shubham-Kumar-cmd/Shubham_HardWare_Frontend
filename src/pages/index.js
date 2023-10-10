import { Button } from "react-bootstrap";
import Base from "../components/Base";
import { toast } from "react-toastify";
import axios from "axios";

function Index(){

    function showSuccessToast(){
        toast.success("this is success message !!")
        toast.error("error")
        toast.warning("warning")
        // toast('🦄 Wow so easy!', {
        //     position: "top-right",
        //     autoClose: 5000,
        //     hideProgressBar: false,
        //     closeOnClick: true,
        //     pauseOnHover: true,
        //     draggable: true,
        //     progress: undefined,
        //     theme: "light",
        //     });
    }

    //it is not the best way to use axios
    function getDataFromFakeServer(){
        toast.info("getting data from server!!");
        axios
        .get("https://jsonplaceholder.typicode.com/posts")
        .then((response)=>{//It will give the promises
            console.log(response.data);
            toast.success("request done");
        })
        .catch((error)=>{
            console.log(error);
            toast.error("something went wrong on the server!!");
        })
        .finally(()=>{
            console.log("always executed");
        })
    };

    return (
        <Base
        title="Shop What you need" 
        description={"Welcome to trending store, we provide best what you need."} 
        buttonEnabled="true"
        buttonLink="/"
        buttonText="Start shopping"
        buttonType="primary"
        >{/**description={null} */}
            <h1>Working on home page</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut, dolore! Aut necessitatibus porro soluta nemo ducimus ipsam, quo facilis, recusandae illum officia animi molestiae! Atque ratione quidem, unde iure soluta a perspiciatis dolorem quis enim expedita. Facere natus perspiciatis culpa, rerum aspernatur quibusdam veniam molestias?</p>
            <Button variant="success" onClick={showSuccessToast}>Toastify success</Button>

            <Button variant="primary" onClick={getDataFromFakeServer}>Get data from fake API's</Button>
        </Base>
    );
}

export default Index;