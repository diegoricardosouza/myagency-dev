type IconProps = React.HTMLAttributes<SVGElement>

export const Icons = {
  spinner: (props: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  ),
  pix: (props: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      width="100"
      height="100"
      viewBox="0 0 50 50"
      {...props}
    >
      <path d="M 25 0.0390625 C 22.84 0.0390625 20.799531 0.88015625 19.269531 2.4101562 L 9.6796875 12 L 12.929688 12 C 14.529687 12 16.039922 12.619766 17.169922 13.759766 L 23.939453 20.529297 C 24.519453 21.109297 25.480547 21.109531 26.060547 20.519531 L 32.830078 13.759766 C 33.960078 12.619766 35.470312 12 37.070312 12 L 40.320312 12 L 30.730469 2.4101562 C 29.200469 0.88015625 27.16 0.0390625 25 0.0390625 z M 7.6796875 14 L 2.4101562 19.269531 C -0.74984375 22.429531 -0.74984375 27.570469 2.4101562 30.730469 L 7.6796875 36 L 12.929688 36 C 13.999687 36 14.999766 35.580078 15.759766 34.830078 L 22.529297 28.060547 C 23.889297 26.700547 26.110703 26.700547 27.470703 28.060547 L 34.240234 34.830078 C 35.000234 35.580078 36.000312 36 37.070312 36 L 42.320312 36 L 47.589844 30.730469 C 50.749844 27.570469 50.749844 22.429531 47.589844 19.269531 L 42.320312 14 L 37.070312 14 C 36.000313 14 35.000234 14.419922 34.240234 15.169922 L 27.470703 21.939453 C 26.790703 22.619453 25.9 22.960938 25 22.960938 C 24.1 22.960937 23.209297 22.619453 22.529297 21.939453 L 15.759766 15.169922 C 14.999766 14.419922 13.999688 14 12.929688 14 L 7.6796875 14 z M 25 29.037109 C 24.615 29.038359 24.229453 29.185469 23.939453 29.480469 L 17.169922 36.240234 C 16.039922 37.380234 14.529687 38 12.929688 38 L 9.6796875 38 L 19.269531 47.589844 C 20.799531 49.119844 22.84 49.960938 25 49.960938 C 27.16 49.960938 29.200469 49.119844 30.730469 47.589844 L 40.320312 38 L 37.070312 38 C 35.470313 38 33.960078 37.380234 32.830078 36.240234 L 26.060547 29.470703 C 25.770547 29.180703 25.385 29.035859 25 29.037109 z"></path>
    </svg>
  ),
  visa: (props: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="800"
      height="800"
      fill="none"
      viewBox="0 -11 70 70"
      {...props}
    >
      <rect
        width="69"
        height="47"
        x="0.5"
        y="0.5"
        fill="#fff"
        stroke="#D9D9D9"
        rx="5.5"
      ></rect>
      <path
        fill="#172B85"
        fillRule="evenodd"
        d="M21.25 32.517h-4.24l-3.18-12.132c-.151-.558-.472-1.052-.943-1.284-1.176-.584-2.473-1.05-3.887-1.284v-.467h6.831c.943 0 1.65.701 1.768 1.516l1.65 8.751 4.239-10.267h4.122zm8.718 0h-4.005L29.26 17.35h4.005zm8.479-10.966c.118-.816.825-1.283 1.65-1.283 1.296-.118 2.708.117 3.887.7l.707-3.266A10.1 10.1 0 0 0 41.039 17c-3.887 0-6.715 2.1-6.715 5.017 0 2.218 2.003 3.382 3.418 4.084 1.53.7 2.119 1.166 2.001 1.866 0 1.05-1.178 1.517-2.355 1.517-1.414 0-2.828-.35-4.123-.935l-.707 3.268c1.414.582 2.944.817 4.359.817 4.358.115 7.067-1.984 7.067-5.134 0-3.967-5.537-4.2-5.537-5.949M58 32.517 54.82 17.35h-3.416c-.707 0-1.414.467-1.65 1.166l-5.888 14h4.123l.823-2.216h5.065l.472 2.217zm-6.006-11.083 1.176 5.716h-3.298z"
        clipRule="evenodd"
      ></path>
    </svg>
  ),
  mastercard: (props: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="800"
      height="800"
      fill="none"
      viewBox="0 -11 70 70"
      {...props}
    >
      <rect
        width="69"
        height="47"
        x="0.5"
        y="0.5"
        fill="#fff"
        stroke="#D9D9D9"
        rx="5.5"
      ></rect>
      <path
        fill="#ED0006"
        fillRule="evenodd"
        d="M35.395 34.762a13.5 13.5 0 0 1-8.853 3.298c-7.537 0-13.647-6.181-13.647-13.806s6.11-13.806 13.647-13.806c3.378 0 6.47 1.242 8.853 3.298a13.5 13.5 0 0 1 8.852-3.298c7.537 0 13.648 6.181 13.648 13.806S51.785 38.06 44.247 38.06c-3.378 0-6.47-1.242-8.852-3.298"
        clipRule="evenodd"
      ></path>
      <path
        fill="#F9A000"
        fillRule="evenodd"
        d="M35.395 34.762a13.84 13.84 0 0 0 4.795-10.508 13.84 13.84 0 0 0-4.795-10.508 13.5 13.5 0 0 1 8.852-3.298c7.537 0 13.648 6.181 13.648 13.806S51.785 38.06 44.247 38.06c-3.378 0-6.47-1.242-8.852-3.298"
        clipRule="evenodd"
      ></path>
      <path
        fill="#FF5E00"
        fillRule="evenodd"
        d="M35.395 13.746a13.84 13.84 0 0 1 4.795 10.508c0 4.208-1.861 7.976-4.795 10.508A13.84 13.84 0 0 1 30.6 24.254c0-4.208 1.86-7.976 4.795-10.508"
        clipRule="evenodd"
      ></path>
    </svg>
  ),
  amex: (props: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="800"
      height="800"
      fill="none"
      viewBox="0 -9 58 58"
      {...props}
    >
      <rect
        width="57"
        height="39"
        x="0.5"
        y="0.5"
        fill="#006FCF"
        stroke="#F3F3F3"
        rx="3.5"
      ></rect>
      <path
        fill="#fff"
        fillRule="evenodd"
        d="M11.863 28.894v-8.235h9.324l1 1.22 1.034-1.22h33.842v7.667s-.885.56-1.908.568h-18.74l-1.128-1.298v1.298h-3.695v-2.216s-.505.31-1.597.31h-1.258v1.906h-5.595l-1-1.246-1.014 1.246zM1 14.453l2.098-4.584h3.628l1.19 2.568V9.869h4.51l.709 1.856.687-1.856h20.244v.933s1.064-.933 2.813-.933l6.568.022 1.17 2.534V9.869h3.774l1.039 1.456V9.869h3.809v8.235H49.43l-.995-1.46v1.46H42.89l-.558-1.298h-1.49l-.549 1.298h-3.76c-1.505 0-2.467-.914-2.467-.914v.914h-5.67l-1.125-1.298v1.298H6.188l-.557-1.298H4.145l-.553 1.298H1zm.01 2.597 2.83-6.166h2.145l2.827 6.166H6.929l-.519-1.235H3.375l-.522 1.235zm4.802-2.573-.925-2.158-.928 2.158zm3.195 2.572v-6.166l2.617.01 1.523 3.975 1.486-3.985h2.597v6.166h-1.645v-4.543l-1.743 4.543H12.4l-1.749-4.543v4.543zm9.348 0v-6.166h5.367v1.38h-3.705v1.054h3.618v1.298h-3.618v1.095h3.705v1.339zm6.319.001v-6.166h3.66c1.213 0 2.3.703 2.3 2 0 1.11-.917 1.824-1.805 1.894l2.164 2.272h-2.01l-1.972-2.19h-.692v2.19zm3.525-4.786h-1.88v1.298h1.904c.33 0 .755-.24.755-.65 0-.318-.328-.649-.78-.649m4.785 4.785h-1.68v-6.166h1.68zm3.981 0h-.362c-1.754 0-2.819-1.295-2.819-3.057 0-1.807 1.053-3.109 3.268-3.109h1.818v1.46h-1.884c-.9 0-1.535.658-1.535 1.664 0 1.194.727 1.695 1.774 1.695h.433zm.75.001 2.83-6.166h2.144l2.827 6.166h-1.883l-.52-1.235H40.08l-.522 1.235zm4.801-2.573-.925-2.158-.928 2.158zm3.192 2.572v-6.166h2.09l2.67 3.874v-3.874h1.645v6.166H50.09l-2.737-3.975v3.975zm-32.72 10.79v-6.166h5.367v1.38H14.65v1.054h3.619v1.298H14.65V26.5h3.705v1.34zm26.297 0v-6.166h5.367v1.38h-3.705v1.054h3.601v1.298h-3.6V26.5h3.704v1.34zm-20.721 0 2.613-3.045-2.676-3.12h2.072l1.593 1.929 1.6-1.93h1.99l-2.64 3.083 2.618 3.083h-2.072l-1.547-1.899-1.51 1.9zm7.365.001v-6.166h3.633c1.49 0 2.361.9 2.361 2.074 0 1.417-1.11 2.145-2.575 2.145h-1.731v1.947zm3.511-4.771h-1.823v1.42h1.818c.48 0 .817-.299.817-.71 0-.438-.339-.71-.812-.71m3.198 4.77v-6.166h3.66c1.212 0 2.299.703 2.299 2 0 1.11-.916 1.824-1.805 1.895l2.164 2.271h-2.01l-1.971-2.19h-.693v2.19zm3.524-4.786h-1.88v1.297h1.904c.33 0 .755-.239.755-.649 0-.318-.328-.649-.779-.649m9.252 4.786v-1.338h3.291c.487 0 .698-.247.698-.518 0-.259-.21-.521-.698-.521h-1.487c-1.293 0-2.013-.738-2.013-1.847 0-.988.66-1.942 2.58-1.942h3.203l-.692 1.388h-2.77c-.53 0-.693.26-.693.509 0 .255.202.537.606.537h1.558c1.441 0 2.067.766 2.067 1.77 0 1.079-.697 1.962-2.145 1.962zm5.795 0v-1.338H54.5c.487 0 .698-.247.698-.518 0-.259-.21-.521-.698-.521h-1.487c-1.293 0-2.013-.738-2.013-1.847 0-.988.66-1.942 2.58-1.942h3.203l-.692 1.388h-2.77c-.53 0-.693.26-.693.509 0 .255.202.537.606.537h1.558c1.442 0 2.067.766 2.067 1.77 0 1.079-.697 1.962-2.145 1.962z"
        clipRule="evenodd"
      ></path>
    </svg>
  ),
  diners: (props: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="800"
      height="800"
      viewBox="0 -139.5 750 750"
      {...props}
    >
      <g id="Page-1" fill="none" fillRule="evenodd" stroke="none" strokeWidth="1">
        <g id="diners" fillRule="nonzero">
          <rect
            id="rectangle"
            width="750"
            height="471"
            x="0"
            y="0"
            fill="#0079BE"
            rx="40"
          ></rect>
          <path
            id="Shape-path"
            fill="#FFF"
            d="M584.934 237.947c0-99.415-82.981-168.133-173.895-168.1h-78.242c-92.003-.033-167.73 68.705-167.73 168.1 0 90.93 75.727 165.64 167.73 165.204h78.242c90.914.436 173.895-74.293 173.895-165.204"
          ></path>
          <path
            id="Shape-path"
            fill="#0079BE"
            d="M333.28 83.93c-84.07.027-152.194 68.308-152.214 152.58.02 84.258 68.144 152.533 152.214 152.56 84.09-.027 152.228-68.302 152.24-152.56-.012-84.272-68.15-152.553-152.24-152.58"
          ></path>
          <path
            id="Path"
            fill="#FFF"
            d="M237.066 236.098c.08-41.18 25.746-76.296 61.94-90.25v180.48c-36.194-13.947-61.861-49.044-61.94-90.23m131 90.275V145.847c36.207 13.92 61.914 49.057 61.98 90.257-.066 41.212-25.773 76.322-61.98 90.269"
          ></path>
        </g>
      </g>
    </svg>
  ),
  discover: (props: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="800"
      height="800"
      fill="none"
      viewBox="0 -9 58 58"
      {...props}
    >
      <rect
        width="57"
        height="39"
        x="0.5"
        y="0.5"
        fill="#fff"
        stroke="#F3F3F3"
        rx="3.5"
      ></rect>
      <path
        fill="#1D1D1B"
        fillRule="evenodd"
        d="M19.069 20.322c0 2.443 1.918 4.336 4.385 4.336.698 0 1.295-.137 2.032-.484v-1.908c-.648.649-1.222.91-1.956.91-1.633 0-2.791-1.183-2.791-2.866 0-1.595 1.195-2.853 2.715-2.853.773 0 1.358.276 2.032.935v-1.907c-.711-.36-1.296-.51-1.994-.51-2.455 0-4.423 1.932-4.423 4.347m-4.159-2.017c0 .449.285.686 1.258 1.046 1.843.674 2.39 1.271 2.39 2.592 0 1.608-1.182 2.728-2.866 2.728-1.233 0-2.13-.486-2.876-1.582l1.047-1.008c.373.721.995 1.108 1.768 1.108.724 0 1.259-.499 1.259-1.172 0-.349-.163-.648-.486-.86-.163-.1-.486-.249-1.12-.473-1.523-.548-2.045-1.134-2.045-2.278 0-1.36 1.121-2.38 2.592-2.38.91 0 1.744.31 2.441.92l-.848 1.11c-.422-.473-.821-.672-1.307-.672-.698 0-1.207.397-1.207.92m-4.325 6.166h1.62v-8.308h-1.62zm-3.313-2.067c-.51.46-1.17.66-2.218.66H4.62V17.57h.435c1.047 0 1.683.188 2.218.672.56.499.898 1.273.898 2.068 0 .798-.338 1.595-.898 2.094m-1.893-6.241H3v8.308h2.366c1.259 0 2.167-.297 2.965-.96a4.17 4.17 0 0 0 1.508-3.188c0-2.453-1.832-4.16-4.46-4.16m30.741 0 2.216 5.58 2.244-5.58h1.757l-3.59 8.521h-.872l-3.525-8.521zm6.95 8.308h4.596v-1.407h-2.977v-2.242h2.867v-1.408H44.69V17.57h2.977v-1.408H43.07zm7.288-4.484h.473c1.035 0 1.584-.45 1.584-1.284 0-.809-.549-1.232-1.558-1.232h-.5zm.784-3.825c1.869 0 2.94.898 2.94 2.453 0 1.272-.672 2.108-1.892 2.356l2.615 3.5h-1.993l-2.243-3.338h-.211v3.338h-1.62v-8.309z"
        clipRule="evenodd"
      ></path>
      <path
        fill="url(#paint0_linear_545_4255)"
        fillRule="evenodd"
        d="M34.159 22.727a4.42 4.42 0 1 0-7.447-4.762 4.42 4.42 0 1 0 7.447 4.762"
        clipRule="evenodd"
      ></path>
      <defs>
        <linearGradient
          id="paint0_linear_545_4255"
          x1="36.54"
          x2="29.093"
          y1="19.003"
          y2="14.241"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#F6A000"></stop>
          <stop offset="0.624" stopColor="#E47E02"></stop>
          <stop offset="1" stopColor="#D36002"></stop>
        </linearGradient>
      </defs>
    </svg>
  ),
  jcb: (props: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="800"
      height="800"
      fill="none"
      viewBox="0 -9 58 58"
      {...props}
    >
      <rect
        width="57"
        height="39"
        x="0.5"
        y="0.5"
        fill="#fff"
        stroke="#F3F3F3"
        rx="3.5"
      ></rect>
      <path
        fill="#54B230"
        fillRule="evenodd"
        d="M38.39 20.111h2.849a2 2 0 0 1 .189.014 1 1 0 0 1 .122.018l.02.004a1 1 0 0 1 .187.06 1.3 1.3 0 0 1 .33.197 1.3 1.3 0 0 1 .283.33 1.2 1.2 0 0 1 .141.357 1.33 1.33 0 0 1-.188 1.027 1.24 1.24 0 0 1-.754.511l-.019.004a1 1 0 0 1-.075.013 2 2 0 0 1-.189.017l-.047.002h-2.85zm3.791-2.89a1.26 1.26 0 0 1-.094.81 1.13 1.13 0 0 1-.753.596l-.094.02-.012.002a1 1 0 0 1-.083.01 2 2 0 0 1-.188.012h-2.568v-2.357h2.588l.027.001a2 2 0 0 1 .189.015l.035.005.012.002a1.23 1.23 0 0 1 .706.403 1.2 1.2 0 0 1 .188.322q.03.076.047.159M48.023 5h.02v24.205a4.9 4.9 0 0 1-.35 1.8 5 5 0 0 1-.235.499 5 5 0 0 1-.188.316l-.048.071a5 5 0 0 1-.33.435l-.046.054-.095.105-.047.05-.047.048-.047.048-.047.045-.047.045a5 5 0 0 1-.189.168q-.022.02-.047.04l-.047.038-.047.038-.047.036-.047.036-.047.034-.047.034-.047.033-.047.032-.048.031q-.022.016-.047.031l-.094.06-.047.027-.047.028-.047.027-.047.026-.048.026-.047.025-.047.024-.047.024-.047.023-.047.022-.047.022-.047.021-.047.02-.047.02-.047.02-.048.019-.047.018-.047.018-.047.017-.047.016-.047.017-.047.015-.047.015-.047.015-.048.013q-.022.008-.047.014l-.047.013-.047.012-.047.012-.047.012-.047.01q-.024.007-.047.01l-.047.011-.047.01-.048.008-.047.01-.047.007-.047.008-.047.007-.047.006-.047.007-.047.005-.047.005-.047.005-.048.005q-.023 0-.047.004l-.047.003-.047.003q-.023 0-.047.003l-.047.001-.047.002-.047.001-.047.001h-7.215v-9.868h7.591l.047-.001.047-.001.048-.001.047-.002.047-.002.047-.003.047-.003.047-.004.047-.004.047-.005.047-.005.048-.006.047-.006.047-.007.047-.007.047-.008.047-.008.047-.009.047-.01.047-.01a6 6 0 0 0 .236-.06l.047-.014.047-.014.047-.016.095-.032.047-.018.047-.018.047-.02a3.3 3.3 0 0 0 .47-.245 3 3 0 0 0 .236-.17 2.6 2.6 0 0 0 .283-.27 2.4 2.4 0 0 0 .188-.246 2.1 2.1 0 0 0 .283-.64 2.2 2.2 0 0 0 .068-.555 2.2 2.2 0 0 0-.068-.538 1.96 1.96 0 0 0-.377-.743 2 2 0 0 0-.188-.207 2.5 2.5 0 0 0-.566-.41 2 2 0 0 0-.14-.073 3 3 0 0 0-.19-.084l-.046-.018-.047-.018-.047-.018-.048-.016-.047-.016-.094-.029-.047-.014-.047-.013-.047-.012-.047-.012-.142-.032-.047-.01-.047-.008-.047-.009-.047-.008-.047-.007-.047-.007-.047-.006-.047-.006-.048-.005-.047-.005-.047-.005-.047-.004-.043-.003v-.056l.043-.006.047-.008.047-.008.047-.01q.024-.004.047-.009l.048-.01.047-.01.047-.013a3 3 0 0 0 .33-.102l.047-.018a3 3 0 0 0 .33-.154l.14-.084a2.3 2.3 0 0 0 .33-.253 2.2 2.2 0 0 0 .33-.386 2 2 0 0 0 .142-.25 2 2 0 0 0 .14-.4 2 2 0 0 0 .06-.501 2.4 2.4 0 0 0-.06-.517 2 2 0 0 0-.188-.49 1.95 1.95 0 0 0-.518-.605 2.5 2.5 0 0 0-.612-.358l-.047-.02a3 3 0 0 0-.283-.099l-.047-.014-.094-.025-.047-.012-.095-.022-.047-.01-.047-.01-.047-.008-.047-.008-.047-.008-.047-.007-.047-.007-.047-.006-.047-.005-.047-.005-.048-.005-.047-.004-.047-.004-.047-.003-.047-.003h-.019l-.028-.003-.047-.002-.047-.003-.047-.002-.048-.003-.047-.002-.047-.001-.047-.002h-.047l-.047-.001h-6.932V9.84a4.8 4.8 0 0 1 .526-2.187 4 4 0 0 1 .235-.41l.094-.14.047-.068.047-.064L37 6.91q.022-.03.047-.06l.047-.059.094-.112.047-.053.047-.052.047-.05.095-.097.047-.046.047-.045.047-.044.047-.043.047-.041.094-.08.047-.04.047-.037.048-.037.047-.036.047-.035q.023-.016.047-.034l.047-.033.047-.032.047-.032.047-.03.048-.03.047-.03q.022-.015.047-.029l.047-.027.047-.028.047-.026.047-.026.047-.025.047-.024.047-.024.047-.023.048-.023.047-.022.047-.021.047-.02.047-.021.047-.02.047-.018.047-.019.047-.018.048-.017.047-.017.047-.016.047-.015.047-.016.047-.014.047-.014.047-.014.047-.013.047-.013.048-.012.047-.011.047-.011.047-.01.047-.01.047-.01.047-.01.047-.008.047-.008.048-.008.047-.007.047-.007.047-.007.047-.005.047-.006.047-.005.047-.004.047-.004.047-.003.048-.003q.022-.002.047-.003l.047-.002.047-.002.047-.002h.094L40.874 5h7.148"
        clipRule="evenodd"
      ></path>
      <path
        fill="#006CB9"
        fillRule="evenodd"
        d="M9 21.797V9.84a4.8 4.8 0 0 1 .571-2.274 5 5 0 0 1 .282-.461l.047-.067.047-.064.047-.063.047-.06.047-.058.048-.057.046-.055.047-.053.048-.052.046-.05.095-.097.047-.046.047-.046.047-.043q.022-.023.047-.043l.047-.042q.022-.02.047-.04l.094-.079.047-.037.14-.108.048-.034a4 4 0 0 1 .188-.128l.047-.03.047-.03.047-.028.047-.028.047-.027q.024-.014.047-.026l.047-.026.047-.025.047-.025.047-.024.047-.023.047-.022.047-.022.047-.022.047-.02.047-.02.047-.02.047-.02.047-.018.047-.017.047-.018.047-.017.048-.016.046-.016.047-.015.048-.015.046-.013.048-.014.047-.013.047-.013.047-.012.047-.011.047-.012.047-.01.047-.01.047-.01.047-.01.047-.008.047-.008.047-.008.047-.007.047-.007.047-.006.047-.006.047-.006.047-.005.047-.004.047-.004.047-.004.047-.003q.023 0 .047-.003l.047-.002.047-.002.047-.002h.094L13.897 5h7.14v24.205a4.8 4.8 0 0 1-.369 1.85 4.6 4.6 0 0 1-.329.646l-.047.076a5 5 0 0 1-.33.458l-.046.057-.047.056-.047.053-.047.053-.047.05-.047.05-.047.048-.094.092-.047.044-.047.044-.047.041-.047.042-.047.04-.047.038-.047.038-.047.037-.048.036-.046.035-.047.035q-.024.016-.047.033l-.047.033-.048.032-.047.03q-.022.016-.047.031l-.047.03-.047.029-.047.027-.047.028-.047.026q-.023.014-.047.026l-.047.026-.047.024-.047.024-.047.024-.047.023-.047.022-.047.021-.047.021-.047.02-.047.02-.047.02-.047.018-.047.018-.047.018-.047.016-.047.017-.047.016-.047.015-.047.015-.047.014-.047.014-.047.013-.047.013-.047.012-.047.012-.047.011-.047.01-.047.011-.047.01-.047.01-.047.008-.047.008-.047.008-.047.008-.047.007-.047.006-.047.006-.047.006-.048.005-.047.005-.047.004-.047.004-.047.003-.047.003-.047.002-.047.002-.047.002h-.047l-.047.001H9V23.845l.101.026.047.011.047.012.047.011.047.011.047.01.047.011.047.011.047.01.047.01.047.01.047.01.047.01.047.01.047.01.047.01.047.009.047.009.047.009.047.009.047.009.047.009.048.008.046.009.047.008.048.008.046.008.048.009.047.008.047.007.047.008.047.008.047.007.047.008.047.007.047.007.047.008.047.007.047.006.047.007.047.007.047.007.047.006.047.007.047.006.047.006.047.006.047.006.047.006.047.006.047.006.047.005.047.006.047.005.047.006.047.005.047.005.047.005.047.005.047.005.047.005.047.004.047.005.047.004.047.004.047.005.047.004.047.004.048.004.046.003.047.004.048.004.046.003.048.004.047.003.047.003.047.003.047.003.047.003.047.003.047.003.047.002.047.003.047.002.047.002.047.002.047.002.047.002.047.002.047.002.047.002.047.001.047.001.047.002.047.001.047.001.047.001h.047l.047.002h.094l.047.001h.094l.047.001h.141l.047-.001h.047l.047-.001h.047l.047-.002h.047l.047-.002.047-.001.048-.002.046-.001.047-.002.048-.002.046-.002.048-.002.047-.002.047-.003.047-.002.047-.003.047-.003.047-.003.047-.003.047-.003.047-.004.047-.003.047-.005.047-.004.047-.004.047-.004.047-.005.047-.005.047-.004.047-.006.047-.005.047-.005.047-.006.047-.006.047-.006.047-.006.047-.007.047-.007.047-.007.047-.007.047-.007.047-.008.047-.008.047-.008.047-.008.047-.01.047-.008.047-.009.047-.01.047-.01.047-.009.047-.01.047-.011.047-.01.047-.012.047-.011.048-.012.047-.012.047-.013.047-.012.047-.013.047-.014.047-.013.047-.015.047-.014.047-.015.047-.015.047-.016.047-.016.047-.017.047-.017.047-.017.047-.018.047-.019.047-.019.047-.02.047-.019.047-.02.047-.022.047-.021.047-.023.047-.023.047-.023.047-.024.047-.026.094-.052.047-.027.047-.028.047-.03.047-.029.047-.03.047-.032.047-.033.047-.034.047-.035.094-.074.047-.04q.024-.018.047-.04.024-.02.047-.042l.047-.043a3 3 0 0 0 .236-.247 3.04 3.04 0 0 0 .658-1.305 4 4 0 0 0 .094-.554q.023-.237.023-.482V14.87h-4.161l-.036 5.616a3 3 0 0 1-.058.576 2.5 2.5 0 0 1-.141.447 2.2 2.2 0 0 1-.33.536 2.15 2.15 0 0 1-.799.59 2 2 0 0 1-.282.107 3 3 0 0 1-.235.062l-.047.01-.14.026-.048.007-.047.006-.047.006-.047.005-.047.005-.047.004-.047.003-.047.003-.047.002-.047.001-.047.002h-.141l-.047-.001-.047-.001-.047-.001-.047-.002-.047-.002-.047-.002-.047-.002-.047-.003-.047-.003-.047-.003-.047-.004-.047-.004-.047-.004-.048-.004-.046-.005-.047-.005-.048-.006-.046-.005-.047-.006-.048-.006-.047-.007-.047-.007-.047-.006-.047-.008-.047-.007-.047-.008-.047-.008-.047-.009-.047-.008-.047-.01-.047-.009-.047-.009-.047-.01-.047-.01-.047-.01-.047-.01-.047-.011-.047-.011-.047-.011-.047-.012-.047-.012-.047-.012-.047-.012-.047-.013-.047-.013-.047-.013-.047-.013-.047-.014-.047-.013-.047-.014-.047-.015-.047-.014-.047-.015-.047-.015-.047-.015-.047-.016-.047-.016-.047-.015-.047-.017-.048-.016-.046-.017-.047-.017-.048-.017-.046-.017-.048-.018-.047-.017-.047-.018-.047-.019-.047-.018-.047-.019-.047-.019-.047-.019-.047-.02-.047-.019-.047-.02-.047-.02-.047-.02-.047-.02-.047-.02-.047-.022-.047-.02-.047-.022-.047-.021-.047-.022-.047-.022-.047-.022z"
        clipRule="evenodd"
      ></path>
      <path
        fill="#E10238"
        fillRule="evenodd"
        d="m22.603 16.096-.101.083V9.841a4.8 4.8 0 0 1 .524-2.184 5 5 0 0 1 .33-.55l.046-.068.047-.064.047-.062.047-.06.047-.059.094-.112.047-.053.047-.052.047-.05.141-.143.047-.045.047-.044.048-.043.046-.041.047-.041.047-.04a5 5 0 0 1 .33-.25q.023-.017.047-.033l.14-.093.048-.029.047-.029q.023-.014.047-.027l.047-.028.047-.026.047-.026.047-.025.047-.025.047-.023.047-.024.047-.022.047-.022.047-.022.047-.02.047-.02.047-.02.047-.019.047-.019.047-.017.047-.018.047-.016.047-.017.047-.015.047-.016.047-.014.047-.014.047-.014.047-.013.047-.013.047-.012.048-.011.047-.012.047-.01.047-.01.047-.01.047-.01.047-.008.047-.008.047-.008.047-.007.047-.007.047-.006.047-.006.047-.006.047-.005.047-.004.047-.004.047-.004.047-.003q.023 0 .047-.003l.047-.002.047-.002.047-.002h.094l.02-.001h7.168v24.205a4.8 4.8 0 0 1-.37 1.849 5 5 0 0 1-.376.722l-.047.073q-.022.036-.047.07a6 6 0 0 1-.235.316q-.022.028-.047.057l-.047.055-.047.054-.047.053-.047.05-.047.05a5 5 0 0 1-.188.184q-.023.022-.047.043l-.047.042-.047.041-.047.04-.047.04-.047.037-.047.037-.047.036-.047.035-.047.034-.047.034-.047.033-.047.032-.047.03-.047.031-.047.03-.047.028-.047.028-.047.028-.047.026-.047.026-.048.026-.047.024-.047.024q-.022.012-.047.023l-.047.024-.047.021-.047.022-.047.02-.047.021-.047.02-.047.02-.047.018-.047.018-.047.018-.047.016-.047.017-.047.016-.047.015-.047.015-.047.014-.047.014-.047.013-.047.013-.047.012-.047.012-.047.011-.047.01-.047.011-.047.01-.047.01-.047.008-.047.008-.047.008-.047.008-.047.007-.047.006-.047.006-.047.006-.047.005-.047.005-.047.004-.047.004-.048.003-.047.003-.047.002-.047.002-.047.002h-.047l-.047.001h-7.201V22.87l.1.083.048.037.047.036.047.036.047.034.094.066.047.032.047.031.047.03.047.03.047.03.047.028.047.028.047.027.047.026.047.026.047.025.047.025.047.024.047.024.047.023.047.023.047.022.047.021.047.022.047.02.047.02.047.02.047.02.047.02.047.018.048.018.046.018.047.018.047.017.048.017.047.016.047.016.047.016.047.015.047.015.047.015.047.014.047.015.047.014.047.013.047.013.047.014.047.012.047.013.047.012.047.012.047.011.047.012.047.011.047.01.047.012.047.01.047.01.047.01.047.01.047.01.047.008.047.01.047.008.047.009.047.008.047.009.047.008.047.007.047.008.047.008.047.007.047.007.047.007.047.006.048.007.047.006.047.006.047.006.047.006.047.006.047.005.047.005.047.005.047.005.047.005.047.005.047.004.047.004.047.004.047.004.047.004.047.004.047.003.047.004.047.003.047.003.047.003.047.003.047.003.047.003.047.002.047.002.047.002.047.002.047.002.047.002.047.002.047.001.047.002h.047l.047.002.047.001h.047l.047.002h.048l.046.001h.094l.048.001h.282l.047-.002h.094l.047-.002h.047l.047-.002h.047l.047-.002.047-.001.047-.002.047-.001.047-.002.047-.002.047-.002.047-.002.047-.001.023-.001.024-.001.047-.003.047-.002.047-.003.047-.003.047-.003.047-.003.047-.003.047-.003.047-.004.047-.003.047-.004.047-.004.047-.004.047-.005.047-.004.047-.005.047-.004.048-.005.047-.005.047-.005.047-.005.047-.005.047-.006.047-.005.047-.006.047-.005.047-.006.047-.006.047-.006.047-.006.047-.007.047-.006.047-.007.047-.006.047-.007.047-.007.047-.007.047-.007.047-.007.047-.007.047-.007.047-.008.047-.007.047-.008.047-.008.047-.007.047-.008.047-.008.047-.008.047-.009.047-.008.047-.008.047-.009.047-.008.047-.009.047-.009.047-.008.047-.01.047-.008.048-.01.047-.009.047-.009.047-.01.047-.009.047-.01.047-.009.047-.01.047-.01.047-.01.047-.01.047-.01.047-.01.047-.01.047-.01.047-.011.047-.01.047-.012.047-.01.047-.012.047-.01.047-.012v-2.048l-.047.023-.047.023-.047.023-.047.023-.047.022-.047.022-.047.022-.047.022-.047.021-.047.022-.047.02-.047.021-.047.021-.047.02-.047.02-.047.02-.047.02-.047.02-.047.018-.047.019-.047.019-.047.018-.047.018-.047.018-.047.017-.048.018-.047.017-.047.016-.047.017-.047.016-.047.016-.047.016-.047.015-.047.015-.047.015-.047.015-.047.014-.047.014-.047.014-.047.014-.047.013-.047.013-.047.013-.047.012-.047.013-.047.011-.047.012-.047.012-.047.01-.047.012-.047.01-.047.01-.047.01-.047.01-.047.01-.047.01-.047.009-.047.009-.047.008-.047.008-.047.009-.047.007-.047.008-.047.007-.047.007-.047.007-.047.007-.048.006-.047.006-.047.006-.047.005-.047.006-.047.005-.047.005-.047.004-.047.004-.047.004-.047.004-.028.002-.019.002-.047.003-.047.003-.047.002-.047.003-.047.002-.047.002-.047.001-.047.001h-.047l-.047.001h-.141l-.047-.002-.047-.001-.047-.002-.047-.002-.047-.002-.047-.003-.047-.003-.047-.004-.047-.004-.047-.004-.047-.005-.047-.006-.047-.005-.047-.006-.048-.007-.046-.007-.048-.008-.047-.008-.047-.008-.047-.009-.047-.01-.047-.01-.047-.01-.047-.011-.047-.012-.047-.012-.047-.013a4 4 0 0 1-.188-.057l-.047-.016-.047-.017-.047-.017-.047-.018-.047-.019-.047-.02a3 3 0 0 1-.235-.11l-.047-.025-.047-.027-.047-.026-.094-.058-.047-.03-.047-.032-.094-.067-.047-.036-.047-.037-.047-.039a2 2 0 0 1-.142-.128 2.6 2.6 0 0 1-.376-.451 3 3 0 0 1-.235-.426 3 3 0 0 1-.188-.55 4 4 0 0 1-.094-.563 4.5 4.5 0 0 1 .047-1.18 4 4 0 0 1 .141-.535 3 3 0 0 1 .282-.589 2.7 2.7 0 0 1 .33-.428l.047-.05a3 3 0 0 1 .14-.133l.048-.041.047-.039q.022-.018.047-.037l.047-.036q.022-.018.047-.034l.047-.033q.022-.017.047-.032a2 2 0 0 1 .14-.088l.048-.027a3 3 0 0 1 .14-.075q.025-.01.048-.023l.047-.022.047-.021.047-.02.047-.02.047-.019.047-.018.047-.017.047-.017.047-.016.141-.044.047-.013.094-.025.047-.012.047-.011.047-.01.047-.01.047-.01.047-.01.047-.008.047-.008.048-.007.046-.007.047-.007.047-.006.048-.006.047-.005.047-.005.047-.005.047-.003.047-.004.047-.003.047-.003.047-.003q.023 0 .047-.002l.047-.001.047-.002h.047l.047-.001h.188l.047.002.047.001.047.002.047.002.047.002.047.003.047.003.047.003.019.001.028.002.047.004.047.004.047.004.047.005.047.005.047.005.047.005.047.005.047.006.047.006.047.006.047.007.047.006.047.007.048.008.047.007.047.008.047.008.047.008.047.008.047.01.047.008.047.01.047.009.047.01.047.01.047.01.047.01.047.011.047.012.047.011.047.012.047.012.047.012.047.012.047.013.047.013.047.013.047.014.047.014.047.014.047.014.047.015.047.014.047.016.047.015.047.016.047.016.047.016.047.017.047.016.047.017.047.018.047.017.047.018.047.019.048.018.047.018.047.02.047.019.047.02.047.019.047.02.047.02.047.02.047.021.047.021.047.021.047.022.047.022.047.021.047.023.047.022.047.023.047.022.047.024.047.023.047.023V15.2l-.047-.01-.047-.012-.047-.01-.047-.012-.047-.01-.047-.011-.047-.01-.047-.011-.047-.01-.047-.01-.047-.011-.047-.01-.047-.01-.047-.01-.047-.01-.047-.01-.047-.009-.047-.01-.047-.008-.047-.01-.047-.009-.047-.009-.047-.009-.047-.009-.047-.009-.048-.008-.047-.01-.047-.008-.047-.008-.047-.008-.047-.009-.047-.008-.047-.008-.047-.008-.047-.008-.047-.008-.047-.007-.047-.008-.047-.007-.047-.008-.047-.007-.047-.007-.047-.007-.047-.007-.047-.007-.047-.007-.047-.007-.047-.006-.047-.007-.047-.006-.047-.007-.047-.006-.047-.006-.047-.006-.047-.005-.047-.006-.047-.006-.047-.005-.047-.006-.047-.005-.047-.005-.047-.005-.047-.005-.047-.005-.047-.004-.047-.005-.047-.004-.048-.004-.047-.004-.047-.004-.047-.004-.047-.004-.047-.003-.047-.004-.047-.003-.047-.003-.047-.003-.047-.003-.047-.002-.047-.003-.047-.002-.024-.001h-.023l-.047-.003-.047-.002-.047-.002-.047-.001-.047-.002-.047-.002-.047-.001-.047-.001-.047-.002h-.047l-.047-.002h-.047l-.047-.002h-.094l-.047-.002h-.424l-.046.001-.048.001h-.047l-.047.002h-.047l-.047.002-.047.001-.047.002-.047.001-.047.002-.047.002-.047.002-.047.001-.047.003-.047.002-.047.002-.047.003-.047.003-.047.002-.047.003-.047.004-.047.003-.047.003-.047.004-.047.004-.047.003-.047.004-.047.004-.047.005-.047.004-.047.005-.047.005-.047.005-.047.005-.047.005-.047.005-.047.006-.047.006-.047.006-.047.006-.047.006-.047.007-.047.006-.047.007-.047.007-.048.007-.047.008-.047.007-.047.008-.047.008-.047.008-.047.009-.047.008-.047.01-.047.008-.047.01-.047.01-.047.009-.047.01-.047.01-.047.01-.047.011-.047.01-.047.012-.047.012-.047.011-.047.012-.047.012-.047.013-.047.013-.047.013-.047.013-.047.014-.047.013-.047.015-.047.014-.047.015-.047.015-.047.016-.047.015-.047.016-.047.017q-.024.007-.047.017-.024.007-.047.017l-.048.017-.046.018-.048.018-.047.02-.047.018-.047.02-.047.02-.047.02-.047.02-.047.022-.047.021-.047.023-.047.022-.047.024-.047.023-.047.024-.047.025-.047.025-.047.026-.047.027-.047.027-.047.028-.047.028-.047.029-.047.03-.047.03-.047.031-.047.032-.047.033-.047.034-.047.034z"
        clipRule="evenodd"
      ></path>
    </svg>
  ),
  creditcard: (props: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="800"
      height="800"
      fill="none"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="#0F1729"
        d="M5 16a1 1 0 0 1 1-1h2a1 1 0 1 1 0 2H6a1 1 0 0 1-1-1M11 15a1 1 0 1 0 0 2h1a1 1 0 1 0 0-2z"
      ></path>
      <path
        fill="#0F1729"
        fillRule="evenodd"
        d="M6.788 3c-.819 0-1.494 0-2.044.046-.571.047-1.096.149-1.588.404A4 4 0 0 0 1.45 5.156c-.255.492-.357 1.017-.404 1.588C1 7.294 1 7.969 1 8.788v6.424c0 .819 0 1.494.046 2.044.047.571.149 1.096.404 1.588a4 4 0 0 0 1.706 1.706c.492.255 1.017.357 1.588.404.55.046 1.225.046 2.044.046h10.424c.819 0 1.494 0 2.044-.046.571-.047 1.096-.149 1.588-.404a4 4 0 0 0 1.706-1.706c.255-.492.357-1.017.404-1.588.046-.55.046-1.226.046-2.044V8.788c0-.819 0-1.494-.046-2.044-.047-.571-.149-1.096-.404-1.588a4 4 0 0 0-1.706-1.706c-.492-.255-1.017-.357-1.588-.404C18.706 3 18.03 3 17.212 3zm-2.71 2.225c.159-.082.386-.15.831-.186C5.367 5 5.96 5 6.83 5h10.34c.871 0 1.463 0 1.92.039.446.037.673.104.832.186a2 2 0 0 1 .853.853c.082.159.15.386.186.831.025.295.034.646.037 1.091H3.002c.003-.445.012-.796.037-1.09.037-.446.104-.673.186-.832a2 2 0 0 1 .853-.853M3 10v5.17c0 .871 0 1.463.039 1.92.037.446.104.673.186.832a2 2 0 0 0 .853.853c.159.082.386.15.831.186C5.367 19 5.96 19 6.83 19h10.34c.871 0 1.463 0 1.92-.039.446-.037.673-.104.832-.186a2 2 0 0 0 .853-.853c.082-.159.15-.386.186-.831.038-.458.039-1.05.039-1.921V10z"
        clipRule="evenodd"
      ></path>
    </svg>
  )
}
