const Footer = () => {
    return (
        <p>
            &copy; {new Date().getFullYear()} mart1d4 <br />
            All rights reserved. All wrongs reserved.
        </p>
    );
}

const Head = ({ title, meta }) => {
    return (
        <>
            {meta.description && (
                <meta name="description" content={meta.description} />
            )}
            {meta.tag && <meta name="keywords" content={meta.tag} />}
            {meta.author && <meta name="author" content={meta.author} />}
        </>
    );
}

export default {
    footer: <Footer />,
    head: Head,
    postFooter: null,
    darkMode: false,
}
