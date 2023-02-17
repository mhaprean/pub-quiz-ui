import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledNoRooms = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 20px;

  svg {
    max-width: 400px;
  }
  .no-rooms {
    margin-top: 20px;
    text-align: center;
  }
`;

const NoRooms = () => {
  return (
    <StyledNoRooms className="NoRooms">
      <svg viewBox="0 0 865.76 682.89">
        <defs>
          <filter id="b" x="444.44" y="-3646" width="198.87" height="32766" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
            <feFlood flood-color="#fff" result="bg" />

            <feBlend in="SourceGraphic" in2="bg" />
          </filter>

          <mask id="a" x="444.44" y="-3646" width="198.87" height="32766" maskUnits="userSpaceOnUse">
            <g filter="url(#b)" />
          </mask>

          <linearGradient id="c" x1="543.97" y1="258.39" x2="565.15" y2="347.9" gradientUnits="userSpaceOnUse">
            <stop offset="0" stop-color="#fff" />

            <stop offset="1" />
          </linearGradient>

          <filter id="e" x="174.41" y="-3646" width="239.44" height="32766" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
            <feFlood flood-color="#fff" result="bg" />

            <feBlend in="SourceGraphic" in2="bg" />
          </filter>

          <mask id="d" x="174.41" y="-3646" width="239.44" height="32766" maskUnits="userSpaceOnUse">
            <g filter="url(#e)" />
          </mask>

          <linearGradient id="f" x1="358.29" y1="345.66" x2="322.2" y2="491.47" />

          <filter
            id="h"
            x="444.44"
            y="159.1"
            width="198.87"
            height="174.55"
            filterUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB"
          >
            <feFlood flood-color="#fff" result="bg" />

            <feBlend in="SourceGraphic" in2="bg" />
          </filter>

          <mask id="g" x="444.44" y="159.1" width="198.87" height="174.55" maskUnits="userSpaceOnUse">
            <g mask="url(#a)" filter="url(#h)">
              <path
                d="M640,307.91c-8.13-19.78-17.75-39.46-32.87-54.58-13.73-13.72-31.23-22.92-48.44-31.9-37.8-19.75-76.39-42.58-114.2-62.33q1.65,22.74,1.24,45.55c2.86,4.61,5.75,9.22,8.63,13.88C460.17,228,469.17,235,478,241.81c10.43,8.05,21,16.18,33,21.57,9.29,4.18,19.25,6.63,28.87,10a156.89,156.89,0,0,1,77.62,60.26q13.28-8,25.84-17.07C642.24,313.67,641.13,310.77,640,307.91Z"
                fill="url(#c)"
              />
            </g>
          </mask>

          <filter
            id="j"
            x="174.41"
            y="306.75"
            width="239.44"
            height="298.1"
            filterUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB"
          >
            <feFlood flood-color="#fff" result="bg" />

            <feBlend in="SourceGraphic" in2="bg" />
          </filter>

          <mask id="i" x="174.41" y="306.75" width="239.44" height="298.1" maskUnits="userSpaceOnUse">
            <g mask="url(#d)" filter="url(#j)">
              <polygon points="284.01 306.75 174.41 604.85 413.85 604.85 351.54 354.48 284.01 306.75" fill="url(#f)" />
            </g>
          </mask>
        </defs>

        <ellipse
          cx="437.33"
          cy="605.7"
          rx="294.35"
          ry="56.97"
          transform="translate(-12.73 9.4) rotate(-1.21)"
          fill="#6b87fa"
          data-primary="true"
        />

        <ellipse cx="437.33" cy="605.7" rx="294.35" ry="56.97" transform="translate(-12.73 9.4) rotate(-1.21)" fill="#fff" opacity="0.7" />

        <path
          d="M763.6,415.72s92.8-87.57,41.81-203.85c-14.16-32.31-37.07-60-65.56-80.82C676,84.46,514.57-7.72,271.67,27.88a181.1,181.1,0,0,0-73.15,27.47c-35.65,23.39-73.44,66.35-57.37,140,5.68,26,4.4,53.15-5,78.08-9.28,24.71-26.86,55-59.58,87.69,0,0-69.72,67.35-1.89,125.64a123.77,123.77,0,0,0,50.09,25.77C209.38,534.16,551.36,606,763.6,415.72Z"
          fill="#6b87fa"
          data-primary="true"
        />

        <path
          d="M763.6,415.72s92.8-87.57,41.81-203.85c-14.16-32.31-37.07-60-65.56-80.82C676,84.46,514.57-7.72,271.67,27.88a181.1,181.1,0,0,0-73.15,27.47c-35.65,23.39-73.44,66.35-57.37,140,5.68,26,4.4,53.15-5,78.08-9.28,24.71-26.86,55-59.58,87.69,0,0-69.72,67.35-1.89,125.64a123.77,123.77,0,0,0,50.09,25.77C209.38,534.16,551.36,606,763.6,415.72Z"
          fill="#fff"
          opacity="0.7"
        />

        <path
          d="M280.08,621.19s3.74,4.19,3.69,5.74A101.48,101.48,0,0,1,268,629.24c-7.06.29-17.72-2.36-19.59-3.22s-1.33-3.23-1.33-3.23,5.79-2.62,10-2.6S273,621,280.08,621.19Z"
          fill="#f1f1f1"
        />

        <path d="M287.26,626.61s-1.29-3.78-3.81-5.54c0,0,8.68-1.47,12.61,1.41S290.75,626.29,287.26,626.61Z" fill="#f1f1f1" />

        <path
          d="M336.27,611.38s3.39-4,3.2-5.58A110.56,110.56,0,0,0,323.34,603c-7.16-.53-17.68,1.74-19.49,2.54s-1,3.17-1,3.17,6.08,2.8,10.3,2.92S329.13,611.3,336.27,611.38Z"
          fill="#f1f1f1"
        />

        <path d="M343,606.23s-1,3.72-3.34,5.38c0,0,8.89,1.76,12.6-1S346.57,606.67,343,606.23Z" fill="#f1f1f1" />

        <path d="M172.26,618.65v-5a9.33,9.33,0,0,1,3.89,1.48C178.72,617,175.67,618.06,172.26,618.65Z" fill="#f1f1f1" />

        <path
          d="M213.22,610.68s3.06-4.29,2.74-5.82a111.9,111.9,0,0,0-16.31-1.52c-7.17,0-17.48,3.17-19.21,4.11s-.79,3.24-.79,3.24,6.29,2.3,10.5,2.08S206.1,611.18,213.22,610.68Z"
          fill="#f1f1f1"
        />

        <path d="M219.53,605s-.65,3.78-2.9,5.63c0,0,9,1,12.49-2S223.11,605.16,219.53,605Z" fill="#f1f1f1" />

        <path
          d="M395.83,624.42s4,3.9,4.11,5.45a102.72,102.72,0,0,1-15.56,3.49c-7,.81-17.86-1-19.78-1.76s-1.57-3.12-1.57-3.12,5.58-3,9.75-3.34S388.75,624.79,395.83,624.42Z"
          fill="#f1f1f1"
        />

        <path d="M403.39,629.3s-1.57-3.68-4.21-5.24c0,0,8.54-2.12,12.68.46S406.85,628.72,403.39,629.3Z" fill="#f1f1f1" />

        <path
          d="M448.41,613.62s3.63-3.83,3.53-5.38A110.25,110.25,0,0,0,436,604.46c-7.11-1-17.75.7-19.6,1.38s-1.23,3.1-1.23,3.1,5.9,3.16,10.11,3.53S441.29,613.12,448.41,613.62Z"
          fill="#f1f1f1"
        />

        <path d="M455.46,608.88s-1.18,3.66-3.66,5.17c0,0,8.78,2.28,12.64-.22S459,609.53,455.46,608.88Z" fill="#f1f1f1" />

        <path
          d="M508.91,621.19s3.73,4.19,3.69,5.74a101.48,101.48,0,0,1-15.78,2.31c-7.06.29-17.73-2.36-19.6-3.22s-1.32-3.23-1.32-3.23,5.78-2.62,10-2.6S501.82,621,508.91,621.19Z"
          fill="#f1f1f1"
        />

        <path d="M516.08,626.61s-1.29-3.78-3.81-5.54c0,0,8.68-1.47,12.62,1.41S519.57,626.29,516.08,626.61Z" fill="#f1f1f1" />

        <path
          d="M562,618s3.06-4.3,2.75-5.83a111.93,111.93,0,0,0-16.32-1.52c-7.17.06-17.47,3.17-19.21,4.11s-.78,3.24-.78,3.24,6.28,2.3,10.49,2.08S554.83,618.53,562,618Z"
          fill="#f1f1f1"
        />

        <path d="M568.27,612.36s-.66,3.78-2.9,5.63c0,0,9,1,12.48-2S571.84,612.51,568.27,612.36Z" fill="#f1f1f1" />

        <path
          d="M621.64,624.87s3.74,4.18,3.69,5.74a102.83,102.83,0,0,1-15.78,2.31c-7.06.29-17.73-2.36-19.59-3.23s-1.33-3.23-1.33-3.23,5.79-2.62,10-2.6S614.55,624.7,621.64,624.87Z"
          fill="#f1f1f1"
        />

        <path d="M628.82,630.29s-1.29-3.79-3.82-5.54c0,0,8.68-1.47,12.62,1.41S632.3,630,628.82,630.29Z" fill="#f1f1f1" />

        <path
          d="M672.3,615.15v6.75c-7.12.58-16.91,1.71-20.68,1.89-4.22.22-10.5-2.07-10.5-2.07s-1-2.3.79-3.24,12-4.06,19.21-4.11A90.55,90.55,0,0,1,672.3,615.15Z"
          fill="#f1f1f1"
        />

        <path
          d="M630.62,605.78a34.66,34.66,0,0,0-2-12.36c-.7-2-24.15,6.88-26.44,7.63-7.74,2.56-13.45,7.05-20.12,11.83-3.16,2.27-6.37,4.57-10,5.87s-8,1.57-11.8,2.89-7.59,4.23-8,8.27c8.08,2.58,16.8,4.54,25,2.31,7.92-2.15,14.28-7.91,21.54-11.73a59.33,59.33,0,0,1,16-5.46c0,1.57.08,3.15.13,4.72A43.65,43.65,0,0,0,627.11,618a3.61,3.61,0,0,0,1.44-.68,3.5,3.5,0,0,0,.84-1.46A23,23,0,0,0,630.62,605.78Z"
          fill="#6b87fa"
          data-primary="true"
        />

        <path
          d="M455,598.84c-3.51,0-7.2-.14-10.33,1.47-3.82,2-6,6-7.91,9.87a118,118,0,0,0,69.52-8.11,15.39,15.39,0,0,1-.85,6.52,123.36,123.36,0,0,0,17.3.56,4,4,0,0,0,1.79-.34A3.85,3.85,0,0,0,526,607a33.7,33.7,0,0,0,3.15-9.68,6.06,6.06,0,0,0-.19-3.51,5.82,5.82,0,0,0-3.57-2.65c-10.07-3.57-20.94.8-30.75,3.17A162.55,162.55,0,0,1,455,598.84Z"
          fill="#6b87fa"
          data-primary="true"
        />

        <path
          d="M413.27,366.38q-14.89-.42-29.78-.2a4.65,4.65,0,0,0-3.32.93c-1,1.05-.84,2.75-.43,4.16,1.9,6.55,9.62,16.71,17.45,14.35C405.27,383.2,411.64,374.31,413.27,366.38Z"
          fill="#f7a48b"
        />

        <path
          d="M361.44,354.67l42.19,32.51a3.92,3.92,0,0,1,.24,6h0a3.92,3.92,0,0,1-5.15.12L357.6,359.12Z"
          fill="#2f2e41"
          data-secondary="true"
        />

        <path
          d="M417.28,353.15c-3.64,1.25-8.66,2.68-11.87,4.81s-6.09-2.46-9.37-3.44c-3.51-1-6.61-.29-10.21.23-4.53.66-7.92,3-11.59,5.77a34.07,34.07,0,0,1-12.4,5.84c-2.37,7.75,16.53,2.05,18.93,1.61,2.55-.47,4.41-.58,6.81.55,5.65,2.67,8.14,3.19,14.62,2.59,4.07,2.67,9.22,4.76,13.48.32,2.43-2.53,7-5,9.05-7.62,1.18-1.55,1.3-.5.11-3.4C423.36,356.77,420.55,355.22,417.28,353.15Z"
          fill="#f9b499"
        />

        <path
          d="M379.1,367.26c-2.53,2-6.1,3.31-9.3,4.72a2.35,2.35,0,0,0,.31,4.43c5.58,1.47,18.22-4.1,17-10.05C385.13,365.42,380.78,365.92,379.1,367.26Z"
          fill="#f9b499"
        />

        <path
          d="M374.61,375c-1.26,1.82-1.63,5.7,0,7.39,5.2,5.38,14.24-3.29,17.16-7.19,5.85-7.82-3.36-6-7.86-3.92C381.25,372.45,378.18,373.7,374.61,375Z"
          fill="#f9b499"
        />

        <path d="M379.43,381.7c-.36,12.49,19.66.84,18-7.22-1.36-6.48-7.17.41-9.19,1.95S380.47,379.1,379.43,381.7Z" fill="#f9b499" />

        <path
          d="M387.12,384.91c3.07,8.76,15.51-1.25,14.12-8-.58-2.8-2.19-3.9-4.75-1.77-1.35,1.13-1.92,3.12-3.09,4.42C391.81,381.38,387.18,382.53,387.12,384.91Z"
          fill="#f9b499"
        />

        <path d="M359.66,360.48s-61.53-5.64-81.72-55.1l7-11.36s47.65,2.92,77.93,61.51Z" fill="#6b87fa" data-primary="true" />

        <path d="M284,306.75s37,12.48,67.53,47.73C351.54,354.48,302.52,344.82,284,306.75Z" fill="#e5e5e5" />

        <g opacity="0.3">
          <path d="M305.17,302.66c-2.09-1-4.27-1.91-6.59-2.76l-4.45,7.27c2.27.83,4.6,1.72,7,2.67Z" fill="#fff" />

          <path d="M307.19,303.67l-4.14,7a139.8,139.8,0,0,1,16.24,7.9l2.15-4.9A69.27,69.27,0,0,0,307.19,303.67Z" fill="#fff" />

          <path d="M323.41,321.08a71.56,71.56,0,0,1,6.5,4.69l1.62-2c-2.14-2.36-4.19-4.5-6.21-6.49Z" fill="#fff" />
        </g>

        <path
          d="M437.17,366.62c-3.37,1.77-7.31,2.61-10.67,4.37a98.56,98.56,0,0,0-11.69-19.67l8.39-4.93C427.54,353.12,432.84,359.89,437.17,366.62Z"
          fill="#fff"
        />

        <path
          d="M546.39,413.74a136.66,136.66,0,0,1-90.05,12.07c3.4-27.74-.26-55.8-3.9-83.51q-5.13-38.87-10.24-77.72c-1.41-10.69-5.9-22.32-6.72-33.07s3.35-23.26,13.51-26.87c9-3.2,18.87,1.82,26.32,7.84,25.35,20.48,38,52.57,47.49,83.75C534.36,334.15,541.05,374.45,546.39,413.74Z"
          fill="#6b87fa"
          data-primary="true"
        />

        <path
          d="M546.39,413.74a136.66,136.66,0,0,1-90.05,12.07c3.4-27.74-.26-55.8-3.9-83.51q-5.13-38.87-10.24-77.72c-1.41-10.69-5.9-22.32-6.72-33.07s3.35-23.26,13.51-26.87c9-3.2,18.87,1.82,26.32,7.84,25.35,20.48,38,52.57,47.49,83.75C534.36,334.15,541.05,374.45,546.39,413.74Z"
          opacity="0.2"
        />

        <path
          d="M532.47,370.22a591.64,591.64,0,0,0-13.27,102c-.46,10.78-.62,21.6-1.91,32.31-1.7,14.13-5.33,28-8.95,41.71q-6,23-12.1,46a176,176,0,0,0,24.62,5,79.15,79.15,0,0,0,18.39.33c16.93-2,32.12-12.26,49.1-13.75-.09-27.83-.18-55.68-1.7-83.47Q585,471,581.29,441.8c-1.9-14.87-4.24-29.74-8.31-44.17-1.77-6.26-3.94-12.57-8-17.69C557.93,370.94,543.45,366.94,532.47,370.22Z"
          fill="#2f2e41"
          data-secondary="true"
        />

        <path
          d="M532.47,370.22a591.64,591.64,0,0,0-13.27,102c-.46,10.78-.62,21.6-1.91,32.31-1.7,14.13-5.33,28-8.95,41.71q-6,23-12.1,46a176,176,0,0,0,24.62,5,79.15,79.15,0,0,0,18.39.33c16.93-2,32.12-12.26,49.1-13.75-.09-27.83-.18-55.68-1.7-83.47Q585,471,581.29,441.8c-1.9-14.87-4.24-29.74-8.31-44.17-1.77-6.26-3.94-12.57-8-17.69C557.93,370.94,543.45,366.94,532.47,370.22Z"
          opacity="0.2"
        />

        <path
          d="M583.08,456.84q-.83-7.53-1.79-15c-1.9-14.87-4.24-29.74-8.31-44.17-1.77-6.26-3.94-12.57-8-17.69-7.08-9-21.56-13-32.54-9.72q-5.31,24.18-8.59,48.76C540.47,435.93,560.94,448.2,583.08,456.84Z"
          opacity="0.2"
        />

        <path
          d="M647.89,588.15l-19.47,8.66c-3.62,1.61-7.24,3.22-11,4.5a65.29,65.29,0,0,1-28.28,3.15q-5.08-16.5-10.18-33c-2.43-7.87-4.86-15.75-6.51-23.81-2.1-10.2-2.94-20.62-3.78-31l-6.63-82.29c21-20.22,44.1-35.53,71.45-45.57,2.58-1,5.35-1.85,8-1.25A166.64,166.64,0,0,1,642,461.4c-1.78,8-4.13,15.92-5.18,24.06-1.71,13.26.07,26.69,1.86,39.93C641.39,545.68,645.16,567.86,647.89,588.15Z"
          fill="#2f2e41"
          data-secondary="true"
        />

        <path
          d="M641.06,465.34c.32-1.31.63-2.62.92-3.94a166.64,166.64,0,0,0-.44-73.86c-2.68-.6-5.45.3-8,1.25-27.35,10-50.47,25.35-71.45,45.57l2,24.75C589.31,463.06,615.31,465.93,641.06,465.34Z"
          opacity="0.2"
        />

        <path
          d="M484.67,311.35c2.55,20.18-.72,43.17-12.37,49s-25.21,8-38.11,9.74c-5.1-8.2-10.36-15.63-15.47-23.83,13.66-11.9,34.1-22.3,37.31-40.13a90,90,0,0,0-1.53-38.6C468.62,289.22,472.69,288.37,484.67,311.35Z"
          fill="#2f2e41"
          data-secondary="true"
        />

        <path
          d="M484.67,311.35c2.55,20.18-.72,43.17-12.37,49s-25.21,8-38.11,9.74c-5.1-8.2-10.36-15.63-15.47-23.83,13.66-11.9,34.1-22.3,37.31-40.13a90,90,0,0,0-1.53-38.6C468.62,289.22,472.69,288.37,484.67,311.35Z"
          opacity="0.2"
        />

        <path
          d="M529.13,352.71c-7,6.77-16.85,10.15-26.59,9.92-8.14-22.28-22.16-41.82-34.83-61.88s-24.33-41.64-26.83-65.23c-.63-6-5.28-11.32-5.76-17.34s1.58-12.63,6.63-16,12.3-2.53,17.64.63,9.25,8.2,12.85,13.26C500.82,256.27,515.76,305.27,529.13,352.71Z"
          fill="#2f2e41"
          data-secondary="true"
        />

        <path
          d="M468.36,277.47c-1.1-20.56-2.45-42-12.77-59.82-2.26-3.9-5.17-7.76-9.38-9.36-18.45-7-7.38,24.71-4.7,31.52A94.67,94.67,0,0,0,468.36,277.47Z"
          fill="#fff"
        />

        <path
          d="M432.43,206.55a60.9,60.9,0,0,0-1.66,29.55c5.34,27.58,14.3,57,17.88,84.86,8.25-38.78,2.26-82.9-15.82-118.18A21.43,21.43,0,0,1,432.43,206.55Z"
          fill="#6b87fa"
          data-primary="true"
        />

        <path
          d="M432.43,206.55a60.9,60.9,0,0,0-1.66,29.55c5.34,27.58,14.3,57,17.88,84.86,8.25-38.78,2.26-82.9-15.82-118.18A21.43,21.43,0,0,1,432.43,206.55Z"
          opacity="0.4"
        />

        <path
          d="M444.39,142.37s-17.18,15.88-26.87,14.91-5.37-20.7-5.37-20.7S433.8,134.67,444.39,142.37Z"
          fill="#6b87fa"
          data-primary="true"
        />

        <path d="M444.39,142.37s-17.18,15.88-26.87,14.91-5.37-20.7-5.37-20.7S433.8,134.67,444.39,142.37Z" opacity="0.2" />

        <ellipse cx="387.66" cy="177.81" rx="39.26" ry="51.98" transform="translate(-36.97 217.65) rotate(-30)" fill="#f9b499" />

        <path
          d="M376.1,229.68l-.48-3a9.17,9.17,0,0,0,2.84,2.53l.14-2.6a4,4,0,0,0,3.72,1.12,11.81,11.81,0,0,0,3.73-1.59,8,8,0,0,0,2.53-2,2.67,2.67,0,0,0,.24-3l3.17,2.94-1.8-5.3,2.22,2.31a7.76,7.76,0,0,0,2.62,2,2.62,2.62,0,0,0,3-.68c1-1.41-.25-3.29-1.54-4.43A26.88,26.88,0,0,0,373.36,212c-1.47.31-5.39,1.12-6.11,2.63-.49,1,.77,3.93,1.19,5a24.3,24.3,0,0,0,3.17,5.56C372.33,226.07,376,228.76,376.1,229.68Z"
          fill="#2f2e41"
          data-secondary="true"
        />

        <path
          d="M361.53,161.58c1.8,4.23,4.47,8.43,8.66,10.32,2.72,1.22,5.79,1.34,8.77,1.34q5.37,0,10.73-.39c5,5.44,9.29,11.17,12.07,18,2.72-1.62,5.83-3.73,8.56-5.35-2.82-6.13-5.19-12.69-8-18.81,7.79,5.73,19,7.06,28.09,3.79C424.47,158.12,417,146.62,407.27,137Z"
          fill="#2f2e41"
          data-secondary="true"
        />

        <path
          d="M405.71,171.58a49.55,49.55,0,0,1-6.1-10.92c-.85-2.09.58-4.89,1.53-6.94a7.61,7.61,0,0,1,4.93-4.33,4.24,4.24,0,0,1,2.95.78c3.87,3.86,4.92,9.66,5.5,15.1a23,23,0,0,1,0,6.63,8.56,8.56,0,0,1-3.3,5.58A28.93,28.93,0,0,1,405.71,171.58Z"
          fill="#f7b595"
        />

        <path d="M417.49,140.3s18.24-.82,26.9,2.07c0,0-6.25-12-34.65-11.55S417.49,140.3,417.49,140.3Z" fill="#6b87fa" data-primary="true" />

        <path
          d="M417.49,140.3c-31.09,3.93-60.5,26.85-69.5,56.87-2.89-1-5.16-3.78-7.52-5.75-7.1-5.91-17.14-10.44-18.06-19.63-1.48-14.79,2.23-29.55,5.9-43.95,9-7.91,18.71-17.44,30.48-19.75,13.88-2.71,27.84,3.2,40.74,9,4.91,2.21,8.79,6.55,11.85,10.86C411.93,128.74,418,140.23,417.49,140.3Z"
          fill="#6b87fa"
          data-primary="true"
        />

        <path
          d="M417.49,140.3c-31.09,3.93-60.5,26.85-69.5,56.87-2.89-1-5.16-3.78-7.52-5.75-7.1-5.91-17.14-10.44-18.06-19.63-1.48-14.79,2.23-29.55,5.9-43.95,9-7.91,18.71-17.44,30.48-19.75,13.88-2.71,27.84,3.2,40.74,9,4.91,2.21,8.79,6.55,11.85,10.86C411.93,128.74,418,140.23,417.49,140.3Z"
          fill="#fff"
          opacity="0.3"
        />

        <path
          d="M399.53,117.1c-12.9-5.81-26.86-11.72-40.74-9-6.13,1.2-11.69,4.37-16.89,8.24A87.45,87.45,0,0,0,334.18,129c-4.94,10.1-7.46,21.73-5.09,32.73,2.69,12.45,11.11,22.58,20.12,31.82,6.69-18.51,21.15-34,38.73-43.55A309.25,309.25,0,0,0,372.86,113Q386,118,399,123.17c4.37,1.75,8.76,3.55,12.94,5.71-.27-.48-.46-.81-.54-.92C408.32,123.65,404.44,119.31,399.53,117.1Z"
          fill="#6b87fa"
          data-primary="true"
        />

        <path
          d="M372.86,113A309.25,309.25,0,0,1,387.94,150a84.24,84.24,0,0,1,29.55-9.68c.43-.06-4-8.53-5.57-11.42-4.18-2.16-8.57-4-12.94-5.71Q386,118,372.86,113Z"
          fill="#6b87fa"
          data-primary="true"
        />

        <path
          d="M368.8,164.26c-4.49-9.56-12.19-17.21-20.2-24.1-3.39-2.93-7.17-5.88-11.63-6.28-3.62-.32-7.87,1.23-9.54,4.46,7.64,3.73,14.31,7.22,21.1,12.64,3.35,2.68,6.59,5.5,10.15,7.9C360.35,160,368.16,162.88,368.8,164.26Z"
          opacity="0.2"
        />

        <path
          d="M340.47,191.42l2.86,23.13s7.28-8.84,8.94-28.24C352.27,186.31,344.82,186.58,340.47,191.42Z"
          fill="#6b87fa"
          data-primary="true"
        />

        <path
          d="M394.05,147.37a92.17,92.17,0,0,1-26.13,17.71c-7.66-7.48-16.42-16.58-26.38-20.53A81.27,81.27,0,0,0,333.7,142l-8.82-2.51a37.88,37.88,0,0,1,3-16.42c1.76-4.18,6.89-6.79,10.51-9.51,8.06-6,21.37-7.33,31.38-6.19,4.42,6.41,23.67,34.16,25.13,38.17C394.89,145.15,394.08,147.8,394.05,147.37Z"
          fill="#6b87fa"
          data-primary="true"
        />

        <path
          d="M394.05,147.37a92.17,92.17,0,0,1-26.13,17.71c-7.66-7.48-16.42-16.58-26.38-20.53A81.27,81.27,0,0,0,333.7,142l-8.82-2.51a37.88,37.88,0,0,1,3-16.42c1.76-4.18,6.89-6.79,10.51-9.51,8.06-6,21.37-7.33,31.38-6.19,4.42,6.41,23.67,34.16,25.13,38.17C394.89,145.15,394.08,147.8,394.05,147.37Z"
          fill="#fff"
          opacity="0.3"
        />

        <path
          d="M369.8,107.41c-1.45-.16-3-.27-4.54-.33a57.19,57.19,0,0,0-7.76,1.62c-9.8,2.77-19,8.66-24.21,17.41a57,57,0,0,1,26.64-13.91c-10.2,6.79-20.74,14-26.92,24.53,12,.43,21.21,10.37,28.95,19.56a102.13,102.13,0,0,1,6.62,8.48,92.27,92.27,0,0,0,25.47-17.4c0,.4.73-1.86.86-1.83C393.35,141.39,374.2,113.8,369.8,107.41Z"
          fill="#6b87fa"
          data-primary="true"
        />

        <path d="M394.91,145.54a.08.08,0,0,0,0,0S394.92,145.54,394.91,145.54Z" fill="#6b87fa" data-primary="true" />

        <path
          d="M448.26,220.24c-7.88-2.13-16.08-3.05-24.22-3.74q2.4-28.63,4.78-57.27c5-.51,9.8-.52,14.61.94C448.21,179,449.37,200.84,448.26,220.24Z"
          fill="#fff"
        />

        <path
          d="M439.11,184.12c-.41,9.61-.56,19.54,3,28.46s11.87,16.64,21.49,16.6l-12.81-57.36c-.83-3.7-1.68-7.48-3.62-10.74-4.07-6.87-9.34-7.06-8.42,1.44A142.89,142.89,0,0,1,439.11,184.12Z"
          fill="#402c35"
        />

        <path
          d="M444.44,159.1a511.31,511.31,0,0,1,.46,66.66c28.82,31.46,50.59,68.47,65.43,108.47s24.45,81.71,34,123.28c23.27,2.62,43.69-10.58,62-25.18s35.51-31.68,57.5-39.74C657.41,364.2,651,334.83,640,307.91c-8.13-19.78-17.75-39.46-32.87-54.58-13.73-13.72-31.23-22.92-48.44-31.9C520.84,201.68,482.25,178.85,444.44,159.1Z"
          fill="#6b87fa"
          data-primary="true"
        />

        <g mask="url(#g)">
          <path
            d="M640,307.91c-8.13-19.78-17.75-39.46-32.87-54.58-13.73-13.72-31.23-22.92-48.44-31.9-37.8-19.75-76.39-42.58-114.2-62.33q1.65,22.74,1.24,45.55c2.86,4.61,5.75,9.22,8.63,13.88C460.17,228,469.17,235,478,241.81c10.43,8.05,21,16.18,33,21.57,9.29,4.18,19.25,6.63,28.87,10a156.89,156.89,0,0,1,77.62,60.26q13.28-8,25.84-17.07C642.24,313.67,641.13,310.77,640,307.91Z"
            fill="#fff"
            opacity="0.1"
          />
        </g>

        <path
          d="M487.13,278.39c2.62-2.1,2.84-5.75,1.49-8.61s-3.94-5.12-6.48-7.3S477,258,475.7,255.15s-1-6.52,1.63-8.58a.86.86,0,0,1,1.16.08c-.86,2.52-1.72,5.27-.53,7.69,1.37,2.77,4.91,4.12,7.8,5.82,6.53,3.84,10.58,11.37,7.72,17.71a4.59,4.59,0,0,1-3.37,2.94C488.45,281,485.9,279.38,487.13,278.39Z"
          fill="#2f2e41"
          data-secondary="true"
        />

        <path
          d="M473.09,284.16a33.52,33.52,0,0,0,17.18,12.9,12.69,12.69,0,0,0,5.93.74,5.73,5.73,0,0,0,4.55-3.5c.81-2.42-.57-5-1.94-7.14q-4.06-6.39-8.49-12.55Z"
          fill="#6b87fa"
          data-primary="true"
        />

        <path
          d="M473.09,284.16a33.52,33.52,0,0,0,17.18,12.9,12.69,12.69,0,0,0,5.93.74,5.73,5.73,0,0,0,4.55-3.5c.81-2.42-.57-5-1.94-7.14q-4.06-6.39-8.49-12.55Z"
          fill="#fff"
          opacity="0.3"
        />

        <path
          d="M529.25,278.39c-2,1.64-8.88,4.58-11.23,3.53-1.85-.82-2.16-3.65-4.17-4.42-3.84-1.45-8.5,1.74-11.9,3-3.06,1.12-11.63-.38-11.07,3.53.71,5,11.34,5.77,15.27,5.61-4.71,1.94-9.1,4.4-13.79,6.1-5.81-2.35-8.73-5.58-15.36-4.76-1.06,4.29,6.84,6.29,9.23,8.93,1.41,1.56,1.78,3.28,3.94,3.87,1.71.46,6.24,0,8-.66,1,3.64,3.94,3.52,7.06,3.53,1.59,0,2.3,2.15,3.84,2.57,1.25.35,2.83-.42,4.18-.33,7.44.52,11.46-7.42,15.72-9.94,2.91-1.73,7.5-5,10.59-5.72C538.42,289.37,529.48,279.15,529.25,278.39Z"
          fill="#f9b499"
        />

        <g opacity="0.3">
          <path
            d="M490.32,274.61l-17.23,9.55a33.38,33.38,0,0,0,2.55,3.27q8.42-4.94,17.19-9.23C492,277,491.17,275.79,490.32,274.61Z"
            fill="#fff"
          />
        </g>

        <path
          d="M547.39,293c-3.21,1.45-6.87,3.33-10.08,4.77-3.65-6.92-7.44-13.21-11.09-20.13l10.48-4.13C540.72,279.71,543.37,286.82,547.39,293Z"
          fill="#fff"
        />

        <path
          d="M601,284.33a106.64,106.64,0,0,1-54.27,14.06c-5.68-8.25-12.22-15.92-16.81-24.82a292.4,292.4,0,0,0,27.32-21.69C575.06,256.44,592.7,267.92,601,284.33Z"
          fill="#2f2e41"
          data-secondary="true"
        />

        <path
          d="M654.19,300.76l-18.3-43.32c-4.92-11.67-10.13-23.73-19.58-32.16-12-10.68-28.76-13.78-43-21.27-21.57-11.37-36.76-32.64-58.68-43.32-23.14-11.27-49.71-8.95-75.34-6.62,9.9,18.94,1.34,43.08,9.46,62.85,5.5,13.37,18.06,22.81,31.57,28s28.1,6.58,42.47,8.18,29,3.48,42.15,9.41c25.86,11.62,42.49,36.81,57.7,60.73C634,318.06,646.12,310.18,654.19,300.76Z"
          fill="#6b87fa"
          data-primary="true"
        />

        <path
          d="M654.19,300.76l-18.3-43.32c-4.92-11.67-10.13-23.73-19.58-32.16-12-10.68-28.76-13.78-43-21.27-21.57-11.37-36.76-32.64-58.68-43.32-23.14-11.27-49.71-8.95-75.34-6.62,9.9,18.94,1.34,43.08,9.46,62.85,5.5,13.37,18.06,22.81,31.57,28s28.1,6.58,42.47,8.18,29,3.48,42.15,9.41c25.86,11.62,42.49,36.81,57.7,60.73C634,318.06,646.12,310.18,654.19,300.76Z"
          opacity="0.4"
        />

        <g opacity="0.2">
          <path d="M467.86,222a106.27,106.27,0,0,0,21.63-13.63c-5.44-4.62-8.33-11.49-11-18.1l-15.54-38c-7.86.32-15.77,1-23.59,1.74,9.9,18.94,1.34,43.08,9.46,62.85,5.5,13.37,18.06,22.81,31.57,28,8.58,3.27,17.6,5,26.73,6.31C492.52,243.61,479,234.49,467.86,222Z" />
        </g>

        <path
          d="M437.14,151.23c.42,16.92-.05,38.41,4.85,54.61s14.49,27.3,29.58,35c-5.64-6.28-8.16-15.42-8.38-23.85,5.88-.91,11.91-4.21,16.43-8.07-8-18.77-15-38.8-18.94-58.81Z"
          fill="#6b87fa"
          data-primary="true"
        />

        <path
          d="M437.14,151.23c.42,16.92-.05,38.41,4.85,54.61s14.49,27.3,29.58,35c-5.64-6.28-8.16-15.42-8.38-23.85,5.88-.91,11.91-4.21,16.43-8.07-8-18.77-15-38.8-18.94-58.81Z"
          fill="#fff"
          opacity="0.3"
        />

        <path
          d="M499.5,234.11c17.92,2.79,35.9-3,53.77-6.07s38.29-2.78,51.55,9.58c-13-3.18-28.45-6.38-41.85-5.47-5.27.36-10.48,1.36-15.7,2.21C531.16,237,514.81,239.78,499.5,234.11Z"
          opacity="0.2"
        />

        <path
          d="M587.09,218.31a52.8,52.8,0,0,0-23.85-.86c-13.35,2.61-25.55,10.37-39.12,11.11,17.76-3.38,36.86-5.94,54.63-9.32C581.69,218.68,584.31,217.18,587.09,218.31Z"
          opacity="0.2"
        />

        <path d="M619.23,293.43a115.69,115.69,0,0,0-33.45-36.95A57.26,57.26,0,0,1,619.23,293.43Z" opacity="0.2" />

        <g mask="url(#i)">
          <polygon points="284.01 306.75 174.41 604.85 413.85 604.85 351.54 354.48 284.01 306.75" fill="#e5e5e5" opacity="0.5" />
        </g>

        <path d="M385.87,370.44a33.93,33.93,0,0,1-11.93,6.15" fill="none" stroke="#f7a48b" stroke-miterlimit="10" />

        <path d="M393.56,372.16a50,50,0,0,1-13.83,11.75" fill="none" stroke="#f7a48b" stroke-miterlimit="10" />

        <path d="M387.77,386.35s7.09-4.09,9.63-11.87" fill="none" stroke="#f7a48b" stroke-miterlimit="10" />
      </svg>
      <Typography className='no-rooms' variant="subtitle2">No rooms available yet. Please wait.</Typography>
    </StyledNoRooms>
  );
};

export default NoRooms;
