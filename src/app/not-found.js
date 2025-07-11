import Link from "next/link";
export default function NotFound() {
  return (
    <div className={"notFoundContainer"}>
      <h3 className="heading-1 heading-1-md opacity-09 Color-1">404</h3>
      <p className="text-3 opacity-09 Color-1">
        We can’t find the page you are looking for{" "}
      </p>
      <Link href="/" className="text-6">
        {" "}
        Back to home
      </Link>
    </div>
  );
}
