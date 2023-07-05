export const draggableMixin = {
  data() {
    return {
      currentElement: "",
      initialX: 0,
      initialY: 0,
    };
  },
  mounted() {
    this.creator(5);
  },
  methods: {
    isTouchDevice() {
      try {
        document.createEvent("TouchEvent");
        return true;
      } catch (e) {
        return false;
      }
    },
    creator(count) {
      for (let i = 1; i <= count; i++) {
        this.items.push({ value: i, label: `Item-${i}` });
      }
    },
    getPosition(value) {
      const element = document.querySelector(
        `#${this.listId} .list-item[data-value="${value}"]`
      );
      return Array.from(
        document.querySelector(`#${this.listId}`).children
      ).indexOf(element);
    },
    dragStart(e) {
      this.initialX = this.isTouchDevice() ? e.touches[0].clientX : e.clientX;
      this.initialY = this.isTouchDevice() ? e.touches[0].clientY : e.clientY;
      this.currentElement = e.target;
    },
    dragOver(e) {
      e.preventDefault();
    },
    drop(e) {
      e.preventDefault();
      const newX = this.isTouchDevice() ? e.touches[0].clientX : e.clientX;
      export const draggableMixin = {
        data() {
          return {
            currentElement: "",
            initialX: 0,
            initialY: 0,
          };
        },
        mounted() {
          this.creator(5);
        },
        methods: {
          isTouchDevice() {
            try {
              document.createEvent("TouchEvent");
              return true;
            } catch (e) {
              return false;
            }
          },
          creator(count) {
            for (let i = 1; i <= count; i++) {
              this.items.push({ value: i, label: `Item-${i}` });
            }
          },
          getPosition(value) {
            const element = document.querySelector(
              `#${this.listId} .list-item[data-value="${value}"]`
            );
            return Array.from(
              document.querySelector(`#${this.listId}`).children
            ).indexOf(element);
          },
          dragStart(e) {
            this.initialX = this.isTouchDevice()
              ? e.touches[0].clientX
              : e.clientX;
            this.initialY = this.isTouchDevice()
              ? e.touches[0].clientY
              : e.clientY;
            this.currentElement = e.target;
          },
          dragOver(e) {
            e.preventDefault();
          },
          drop(e) {
            e.preventDefault();
            const newX = this.isTouchDevice()
              ? e.touches[0].clientX
              : e.clientX;
            const newY = this.isTouchDevice()
              ? e.touches[0].clientY
              : e.clientY;
            const targetElement = document.elementFromPoint(newX, newY);
            const currentValue = this.currentElement.getAttribute("data-value");
            const targetValue = targetElement.getAttribute("data-value");
            const [currentPosition, targetPosition] = [
              this.getPosition(currentValue),
              this.getPosition(targetValue),
            ];
            this.initialX = newX;
            this.initialY = newY;
            try {
              if (currentPosition < targetPosition) {
                targetElement.insertAdjacentElement(
                  "afterend",
                  this.currentElement
                );
              } else {
                targetElement.insertAdjacentElement(
                  "beforebegin",
                  this.currentElement
                );
              }
            } catch (err) {}
          },
        },
      };
      const newY = this.isTouchDevice() ? e.touches[0].clientY : e.clientY;
      const targetElement = document.elementFromPoint(newX, newY);
      const currentValue = this.currentElement.getAttribute("data-value");
      const targetValue = targetElement.getAttribute("data-value");
      const [currentPosition, targetPosition] = [
        this.getPosition(currentValue),
        this.getPosition(targetValue),
      ];
      this.initialX = newX;
      this.initialY = newY;
      try {
        if (currentPosition < targetPosition) {
          targetElement.insertAdjacentElement("afterend", this.currentElement);
        } else {
          targetElement.insertAdjacentElement(
            "beforebegin",
            this.currentElement
          );
        }
      } catch (err) {}
    },
  },
};
