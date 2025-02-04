import { useState } from "react"

// Import AXIOS
import AXIOS from "../Axios";

export default function Post(props) {
    // CSS Stylings
    const postImgStyle = {
        backgroundImage: `url(${props.randomImg})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        width: "100%",
        height: "40vh"
    }

    // Declare a react hook to manage what is the conent of a new/editied comment
    const [commentText, setCommentText] = useState('');

    // Asynchronous function to manage the upload and editing of comments
    async function manageComments() {
        const result = await AXIOS.put(`/articles}`,
            {
                text: commentText,
                commentId: new Date(),
            }
        );

    }

    return (
        <div className="post-container">
            <div className="post-content">
                <div className="post-img" style={postImgStyle}></div>
                <div className="post-text">
                    <div className="meta-info">
                        <p className="post-body">{props.author}</p>
                        <p className="post-body">{props.timestamp}</p>
                    </div>
                    <br /><br />

                    <h3 className="post-title">{props.title}</h3>
                    <br />

                    <p className="post-body">{props.body}</p>
                    <br />

                    <div>
                        <button className="post-comment action-medium" onClick={manageComments}>Comment</button>
                        <br /><br />
                    </div>

                    <p className="post-body" >Kamren: Lorum Ipsum!</p>
                    <br />
                    <p className="post-body" >Samantha: Lorum qui qui...</p>
                    <br />
                    <p className="post-body" >Delphine: 🥰</p>
                </div>
            </div>
        </div>
    )
}