/* eslint-disable no-unused-vars */
import { Link } from "@solidjs/router"
import { createEffect, onMount, createSignal, For, Show } from "solid-js";
import { Motion, Presence } from "@motionone/solid";
import { gsap } from 'gsap';
import useScrollPosition from "../../hooks/useScrollPosition";
import { Button } from '../../components/styled/Button';

export default function Home() {

  const [open, setOpen] = createSignal(false)
  const [toggle, setToggle] = createSignal(false);

  const scroll = useScrollPosition()

  createEffect(() => document.title = "Solid - Home")
  createEffect(() => console.log(scroll()))

  // Example, to be implemented..
  const hoverAnimation = (el, _accessor) => {
    const animation = gsap.to(el, {
      // properties
    });

    el.addEventListener("mouseenter", () => {
      animation.play();
    });

    el.addEventListener("mouseleave", () => {
      animation.pause();
    });
  };

  // Called by use:animation custom directive
  // which is a syntactic sugar for useRef
  const animation = (element, _accessor) => {

    const timeline = gsap.timeline();

    createEffect(() => {
      if (open()) {
        // when refreshing the page el shows up for a sec 
        // even opacity is zero by inline style.
        // So initialy visibility is hidden on its style
        element.style.visibility = "visible"
        timeline.fromTo(
          element,
          { xPercent: -100, opacity: 0 },
          { xPercent: 0, opacity: 1, ease: "power2", stagger: 0.085 }
        );

      } else {
        timeline.fromTo(
          element,
          { opacity: 1, reversed: true, duration: 500 },
          { opacity: 0, ease: "expo" }
        );
      }
    })
  };

  return (
    <div>
      <h1>Home Page</h1>
      <div>
        <Button onClick={() => setOpen(!open())}>{open() ? 'Hide' : 'Show'}</Button>

        <Show when={open()} fallback={<div>Hidden</div>}>
          <div style={{ margin: '5rem 1rem ', visibility: 'hidden' }} use:animation >
            <h1>HELLO</h1>
          </div>
        </Show>

        <Button onClick={() => setToggle(!toggle())}>
          Animate Box
        </Button>


        <Presence exitBeforeEnter>
          <Show when={toggle()}>
            <Motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.3 }}
              style={{
                "background-color": 'crimson',
                height: '150px',
                width: '150px'

              }}>
              <h2 style={{"text-align": 'center'}}>Motion One</h2>
            </Motion.div>
          </Show>
        </Presence>

      </div>


    </div>
  );
}