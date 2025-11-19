import gsap from "gsap";

export const animatePageIn = () => {

    const bannerTop = document.getElementById('page-transition-top');
    const bannerBottom = document.getElementById('page-transition-bottom');
    const bannerLeft = document.getElementById('page-transition-left');
    const bannerRight = document.getElementById('page-transition-right');

    if (bannerTop && bannerBottom && bannerLeft && bannerRight) {
        const tl = gsap.timeline();
        tl.to(bannerTop, { yPercent: -100, duration: 0.8, ease: "power1.in" }, 0),
        tl.to(bannerBottom, { yPercent: 100, duration: 0.8, ease: "power1.in" }, 0),
        tl.to(bannerLeft, { xPercent: -100, duration: 0.7, ease: "power1.in" }, 0),
        tl.to(bannerRight, { xPercent: 100, duration: 0.7, ease: "power1.in" }, 0)

    }

}