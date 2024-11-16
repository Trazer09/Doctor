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