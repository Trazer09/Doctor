var tl = gsap.timeline()
tl.from("#name", {
    y: -20,
    opacity: 0,
    duration: 0.5,
    delay: 0.3

})

tl.from("h4", {
    y: -20,
    opacity: 0,
    duration: 0.5,
    stagger: 0.1  
    // stagger: {
    //     amount: 0.3,       // Total duration for staggering all elements
    //     from: "center",  // Start staggering from the center of the group
    //     ease: "power1.inOut", // Apply easing to the stagger
    //   }

})

gsap.from(".container-image img", {
    opacity: 0,     // Start fully transparent
    duration: 1,    // Animation duration in seconds
    ease: "power2.inOut", // Smooth easing
    y: 50           // Optional: slide up while fading
});

document.addEventListener('DOMContentLoaded', () => {
    const items = document.querySelectorAll('.animated-item'); // Select all animated items

    // Timeline for infinite animation
    const timeline = gsap.timeline({ repeat: -1, defaults: { ease: "power1.inOut", duration: 1 } });

    // Loop through each item and add animations
    items.forEach((item, index) => {
        timeline
            .to(item, {
                opacity: 1,
                y: 0, // Moves into place
                duration: 0.5, // Fade-in and move-up duration
            }, index * 2) // Stagger start based on index (2s delay for each word)
            .to(item, {
                opacity: 1,
                duration: 1.5, // Keep visible
            })
            .to(item, {
                opacity: 0,
                y: -10, // Moves slightly up and fades out
                duration: 0.5,
            });
    });
});



const h3 = document.querySelector("#page2 .defense-text h3");
h3.innerHTML = h3.textContent
  .split(' ')
  .map(word => `<span>${word}</span>`)
  .join(' ');




// gsap.to("#page2 .defense-text h3 span", {
//     scrollTrigger: {
//         trigger: "#page2 .defense-text h3`",
//         start: "top bottom",
//         end: "bottom top",
//         scroller: "#main",
//         scrub: 0.5,
//         marker: true
//     },
//     stagger: 0.2,
//     color: "green"
// });


