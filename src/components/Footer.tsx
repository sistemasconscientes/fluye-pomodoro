import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="mt-12 border-t border-border py-6 text-center">
      <p className="text-xs text-muted-foreground">
        Una creación de{" "}
        <a
          href="https://sistemasconscientes.com?ref=fluye"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-foreground underline underline-offset-2 transition-colors hover:text-primary"
        >
          Laboratorio de Sistemas Conscientes
        </a>
      </p>
      <Link
        to="/features"
        className="mt-2 inline-block text-xs text-muted-foreground underline underline-offset-2 transition-colors hover:text-primary"
      >
        💡 Sugiere mejoras
      </Link>
    </footer>
  );
};

export default Footer;
