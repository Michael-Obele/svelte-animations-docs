# hover/+page.svelte

Demonstrates interactive placeholder vanishing and hover border gradient effects.

```svelte
<script>
  import PlaceHolderVanish from "./PlaceHolderVanish.svelte";
  import HoverBorderGradient from "./HoverBorderGradient.svelte";

  const placeholders = [
    "What's upp",
    "Khem Chee",
    "Maja ma",
    "kee haal chaal",
    "How to assemble your own PC?",
  ];

  const handleSubmit = (e) => {
    console.log("submitted");
  };
</script>

<div
  class="h-[40rem] w-[40rem] mx-auto flex flex-col justify-center items-center px-4"
>
  <h2
    class="mb-10 sm:mb-12 text-xl text-center sm:text-5xl bg-gradient-to-tr from-white from-20% via-neutral-400 to-neutral-600/80 to-90% text-transparent bg-clip-text font-semibold"
  >
    O Helluuu there! 🤗
  </h2>
  <PlaceHolderVanish {placeholders} onSubmit={handleSubmit} />
</div>
```

- Shows a fun animated placeholder input and a (commented) hover border gradient button.
