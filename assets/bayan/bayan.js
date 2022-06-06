/**
 * @bayan
 */
const bayans = [...document.querySelectorAll(".bayan")];
const bayanOpenedClass = "bayan--opened";
const bayanHeight = 1000;

function openBayan(bayanObject) {
  bayanObject.bottom.bayan.style.maxHeight = `${bayanHeight}px`;
  bayanObject.top.bayan.parentElement.classList.add(bayanOpenedClass);
  bayanObject.bottom.bayan.querySelectorAll("a").forEach((anchor) => {
    anchor.setAttribute("tabindex", "0");
  });
  setTimeout(() => {
    bayanObject.bottom.bayan.style.display = "block";
  }, 200);
}

function closeBayan(bayanObject) {
  bayanObject.bottom.bayan.style.maxHeight = "0";
  bayanObject.top.bayan.parentElement.classList.remove(bayanOpenedClass);
  bayanObject.bottom.bayan.querySelectorAll("a").forEach((anchor) => {
    anchor.setAttribute("tabindex", "-1");
  });
  setTimeout(() => {
    bayanObject.bottom.bayan.style.display = "none";
  }, 200);
}

function toggleBayan(bayanObject) {
  if (!bayanObject) return;

  if (
    bayanObject.top.bayan.parentElement.classList.value.includes(
      bayanOpenedClass
    )
  ) {
    closeBayan(bayanObject);
  } else {
    openBayan(bayanObject);
  }
}

function createBayans(bayans) {
  bayans.forEach((bayan, index) => {
    let [bayanTopContent, bayanBottomContent] = Array.from(bayan.children);

    let bayanObject = {
      top: {
        content: bayanTopContent,
      },
      bottom: {
        content: bayanBottomContent,
      },
      bayan,
    };

    function createBayanStructure(bayanObject) {
      let bayanTop = document.createElement("div");
      bayanTop.classList.add("bayan__top");
      bayanTop.appendChild(bayanTopContent);
      bayanObject.bayan.appendChild(bayanTop);
      bayanObject.top.bayan = bayanTop;

      let bayanBottom = document.createElement("div");
      bayanBottom.classList.add("bayan__bottom");
      bayanBottom.appendChild(bayanBottomContent);
      bayanObject.bayan.appendChild(bayanBottom);
      bayanObject.bottom.bayan = bayanBottom;

      let bayanClickHandler = () => {
        toggleBayan(bayanObject);
      };

      const bayansContianer = bayanObject.bayan.parentElement;
      if (bayansContianer.classList.value.includes("bayan__wrapper--single")) {
        bayanClickHandler = (event) => {
          bayansContianer
            .querySelectorAll(".bayan--opened")
            .forEach((bayan, index) => {
              bayan.querySelectorAll(".bayan__top").forEach((bayan) => {
                const clickedItem = event.target.parentElement;
                if (clickedItem != bayan) {
                  bayan.click();
                }
              });
            });
          toggleBayan(bayanObject);
        };
      }

      /**
       * Open bayan on desktop hover
       */
      if (bayanObject.bayan.classList.value.includes("bayan--desktop-hover")) {
        let hoverTimer;
        let hoverTimerDelay = 100;
        if (window.innerWidth > 1199) {
          bayanObject.top.bayan.addEventListener("mouseover", (event) => {
            function isBayanOpened() {
              return bayanObject.bayan.classList.value.includes(
                "bayan--opened"
              );
            }
            function isHoveredSameBayan() {
              return event.target.parentElement === bayanObject.top.bayan;
            }
            if (!isBayanOpened() && isHoveredSameBayan()) {
              hoverTimer = setTimeout(() => {
                bayanClickHandler(event);
              }, hoverTimerDelay);
            }
          });
          bayanObject.top.bayan.addEventListener("mouseout", (event) => {
            clearInterval(hoverTimer);
          });
        }
      }

      bayanObject.top.bayan.addEventListener("click", (event) =>
        bayanClickHandler(event)
      );

      if (bayanObject.bayan.getAttribute("data-bayan")?.includes("absolute")) {
        bayanObject.bottom.bayan.classList.add("bayan__bottom--absolute");

        const hoverBayanWrapper = bayanObject.bayan.parentElement;
        // hoverBayanWrappers.forEach((hoverBayanWrapper) => {
        hoverBayanWrapper.addEventListener("mouseleave", () => {
          closeBayan(bayanObject);
        });
        // });
      }
      if (
        bayanObject.bayan.getAttribute("data-bayan-mobile")?.includes("static")
      ) {
        bayanObject.bottom.bayan.classList.add("bayan__bottom--mobile-static");
      }
    }

    if (bayanObject.bayan.classList.value.includes("bayan--clones")) {
      let bayanStatic = document.createElement("div");
      bayanStatic.classList.add("bayan--static");
      bayanObject.bayan.appendChild(bayanStatic);
      bayanStatic.appendChild(bayanObject.top.content.cloneNode(true));
      bayanStatic.appendChild(bayanObject.bottom.content.cloneNode(true));

      let bayanDynamyc = document.createElement("div");
      bayanDynamyc.classList.add("bayan--dynamic");
      bayanObject.bayan.appendChild(bayanDynamyc);
      createBayanStructure(bayanObject);
      bayanDynamyc.appendChild(bayanObject.top.bayan);
      bayanDynamyc.appendChild(bayanObject.bottom.bayan);
    } else {
      createBayanStructure(bayanObject);
    }
  });
}

if (bayans.length > 0) {
  createBayans(bayans);
}

function initBayan(className) {
  let bayans = document.querySelectorAll(className);
  if (bayans.length > 0) {
    createBayans(bayans);
  }
}
