import { Button } from "./ui/button";

export default function CallToAction() {
  return (
    <section className="py-20 md:pb-36">
      <div className="flex flex-col gap-4 max-w-[90%] mx-auto">
        <h1 className="text-3xl md:text-5xl font-semibold text-center tracking-tight">From quick links to the smart insights.</h1>
        <p className="text-muted-foreground tracking-tight text-center text-lg md:text-xl">
          Use Cutt without signing up, or sign in to unlock analytics and
          performance insights.
        </p>

        <a href="#navbar" className="flex justify-center mt-4">
          <Button className="w-full md:w-fit">Get Started Now</Button>
        </a>
      </div>
    </section>
  );
}
