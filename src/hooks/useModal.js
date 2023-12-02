import { useEffect, useRef, useState } from "react";

function useModal(isShow, onClose) {
  const [container] = useState(() => {
    if (document.querySelector("#root-modal")) {
      return document.querySelector("#root-modal");
    }
    const rootModalEl = document.createElement("div");
    rootModalEl.id = "root-modal";
    return rootModalEl;
  });

  useEffect(() => {
    document.body.appendChild(container);
    return () => {
      document.body.removeChild(container);
    };
  }, []);

  // отключаем доступ к #root, запоминаем положение, компенсируем размеры без скроллов
  const scrollPositionY = useRef(0);
  const scrollPositionX = useRef(0);

  useEffect(() => {
    const rootEl = document.getElementById("root");
    if (isShow) {
      const paddingRight =
        window.innerWidth - document.documentElement.clientWidth;
      const paddingBottom =
        window.innerHeight - document.documentElement.clientHeight;
      scrollPositionY.current = window.scrollY;
      scrollPositionX.current = window.scrollX;

      rootEl.setAttribute("aria-hidden", "true");
      rootEl.setAttribute("inert", "");
      rootEl.style.cssText = `
        overflow: hidden;
        position: fixed;
        top: 0;
        left: 0;
        height: 100vh;
        width: 100vw;
        padding-right: ${paddingRight}px;
        padding-bottom: ${paddingBottom}px;
      `;

      rootEl.scroll({
        top: scrollPositionY.current,
        left: scrollPositionX.current,
        behavior: "instant",
      });
    } else {
      rootEl.removeAttribute("aria-hidden");
      rootEl.removeAttribute("inert");
      rootEl.style.cssText = "";
      window.scroll({
        top: scrollPositionY.current,
        left: scrollPositionX.current,
        behavior: "instant",
      });
    }
  }, [isShow]);

  // закрытие на Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  });

  return { container };
}

export default useModal;
