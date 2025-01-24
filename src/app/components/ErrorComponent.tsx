import Link from "next/link";

export default function ErrorComponent({subject}: {subject: string}) {
  return (
    <>
      <div>Wrong {subject} or {subject} not exist</div>
      <Link className="button" href="/">Go to main page</Link>
    </>
  )
}