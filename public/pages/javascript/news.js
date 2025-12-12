const tabs = document.querySelectorAll(".tab");
    const sliderInner = document.querySelector(".slider-inner");
    let activeTabIndex = 0;

    tabs.forEach((tab, index) => {
      tab.addEventListener("click", () => {
        if (index === activeTabIndex) return;

        sliderInner.style.transform = `translateX(-${index * 100}%)`;

        tabs.forEach(t => t.classList.remove("active"));
        tab.classList.add("active");

        activeTabIndex = index;
      });
    });

  const overlay2 = document.getElementById('overlay2');

  document.querySelectorAll('.news-card').forEach(card => {
    let originalParent = card.parentNode;
    let originalNextSibling = card.nextSibling;

    document.querySelectorAll('.news-card').forEach(card => {
      let originalParent = card.parentNode;
      let originalNextSibling = card.nextSibling;
      let originalRect = null;  // Save original position/size

      function collapseCard() {
        if (card.classList.contains('expanding') || card.classList.contains('collapsing')) return;

        card.classList.remove('expand');
        card.classList.add('collapsing');
        overlay2.classList.remove('active');
        document.body.style.overflow = '';

        // Current card size/position
        const currentRect = card.getBoundingClientRect();
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const scrollLeft = window.scrollX || document.documentElement.scrollLeft;

        // Restore absolute position with current rect
        card.style.position = 'absolute';
        card.style.top = `${currentRect.top + scrollTop}px`;
        card.style.left = `${currentRect.left + scrollLeft}px`;
        card.style.width = `${currentRect.width}px`;
        card.style.height = `${currentRect.height}px`;
        card.style.zIndex = '999';
        card.style.transform = 'translate(0, 0)';
        card.style.opacity = '1';

        void card.offsetWidth; // force reflow

        if (!originalRect) {
          // fallback in case originalRect wasn't saved (shouldn't happen)
          originalRect = {
            top: currentRect.top + scrollTop,
            left: currentRect.left + scrollLeft,
            width: currentRect.width,
            height: currentRect.height
          };
        }

        // Animate back to original position (fade + shrink)
        card.style.transition = 'all 0.5s ease';
        card.style.top = `${originalRect.top}px`;
        card.style.left = `${originalRect.left}px`;
        card.style.width = `${originalRect.width}px`;
        card.style.height = `${originalRect.height}px`;
        card.style.opacity = '0';

        setTimeout(() => {
          card.classList.remove('collapsing');
          card.style.transition = '';
          card.style.position = '';
          card.style.top = '';
          card.style.left = '';
          card.style.width = '';
          card.style.height = '';
          card.style.transform = '';
          card.style.opacity = '';
          card.classList.remove('expanding');

          if (originalNextSibling) {
            originalParent.insertBefore(card, originalNextSibling);
          } else {
            originalParent.appendChild(card);
          }
        }, 500);

        document.removeEventListener('click', outsideClickListener, true);
      }

      function outsideClickListener(event) {
        if (!card.contains(event.target)) {
          collapseCard();
        }
      }

      card.addEventListener('click', function(event) {
        const anyExpanded = document.querySelector('.news-card.expand, .news-card.expanding, .news-card.collapsing');
        if (anyExpanded) {
          return; // Another card is expanded or animating
        }
        event.stopPropagation();

        const rect = card.getBoundingClientRect();
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const scrollLeft = window.scrollX || document.documentElement.scrollLeft;

        // Save original position/size BEFORE moving it
        originalRect = {
          top: rect.top + scrollTop,
          left: rect.left + scrollLeft,
          width: rect.width,
          height: rect.height
        };

        // Set card absolute at current position/size
        card.style.position = 'absolute';
        card.style.top = `${originalRect.top}px`;
        card.style.left = `${originalRect.left}px`;
        card.style.width = `${originalRect.width}px`;
        card.style.height = `${originalRect.height}px`;
        card.style.zIndex = '2000';

        // Move card to body for layering
        document.body.appendChild(card);

        card.classList.add('expanding');
        overlay2.classList.add('active');
        document.body.style.overflow = 'hidden';

        requestAnimationFrame(() => {
          card.style.top = '50%';
          card.style.left = '50%';
          card.style.width = '80vw';
          card.style.height = '80vh';
          card.style.transform = 'translate(-50%, -50%)';
        });

        setTimeout(() => {
          card.classList.remove('expanding');
          card.classList.add('expand');
        }, 300);

        document.addEventListener('click', outsideClickListener, true);
      });
    });

    function outsideClickListener(event) {
      if (!card.contains(event.target)) {
        collapseCard();
      }
    }

    card.addEventListener('click', function (event) {
      const anyExpanded = document.querySelector('.news-card.expand, .news-card.expanding, .news-card.collapsing');
      if (anyExpanded) {
        return; // Another card is already expanded or animating
      }
      event.stopPropagation();

      const rect = card.getBoundingClientRect();
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollLeft = window.scrollX || document.documentElement.scrollLeft;

      // Store the current position
      card.style.position = 'absolute';
      card.style.top = `${rect.top + scrollTop}px`;
      card.style.left = `${rect.left + scrollLeft}px`;
      card.style.width = `${rect.width}px`;
      card.style.height = `${rect.height}px`;
      card.style.zIndex = '2000';

      // Append to body
      document.body.appendChild(card);
      card.classList.add('expanding');
      overlay2.classList.add('active');
      document.body.style.overflow = 'hidden';

      // Trigger animation
      requestAnimationFrame(() => {
        card.style.top = '50%';
        card.style.left = '50%';
        card.style.width = '80vw';
        card.style.height = '80vh';
        card.style.transform = 'translate(-50%, -50%)';
      });

      // Once the transition finishes, switch to .expand
      setTimeout(() => {
        card.classList.remove('expanding');
        card.classList.add('expand');
      }, 300);

      document.addEventListener('click', outsideClickListener, true);
    });
  });