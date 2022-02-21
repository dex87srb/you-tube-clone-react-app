export const VideoWindow = (props) => {

    let source = "https://www.youtube.com/embed/" + props.videoID

    return (
        <iframe
            width="1200"
            src={source}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="videos"
            className={"iframe-tube " + props.class}
        >
        </iframe>)
}