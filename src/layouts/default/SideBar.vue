<template>
  <div class="sidebar-container">
    <div class="sidebar">
      <nav class="navys flex-column justify-content-center">
        <router-link class="navys-link" :to="{ name: 'Home' }" :class="{ active: this.$route.name === 'Home' }"
          data-bs-toggle="tooltip" data-bs-placement="right" title="Accueil">
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAACPUlEQVR4nO3Wu49NURTH8cMIEqExiUd0XgUdDSPRiCinMApRKlT4C2QKDB1KFQUJHQ21oUIyoSChkDEjGY+EwiNh5iN7Zl85uXPvce7cc+4jOd/kNDtr/9b67b2yz0qSioreA9twFzPxuxPWkn4Aw/huMWFtuEH8Ebyvi50M690o/ixmYxE3sAEbcTOu/QkxdXsmG5idN9HJwgdwLSaew2iDmDMpc9exIq7PUxe7aK3M4tfgfsz5C8czYo/iR4x9iHVdNYDNeB7zfcJQjj0H8DnuedY1A9iNdzHXW+xsYe9WvE43fEcN4DC+xTzjWL8EjUE8jhqzHTOAk/gdc9zGqja0VuMKzpduAMvC65K69atYXmiSsgyEU8atqBtO/1Rh4mUbiL36JGp+xaFChLNz1hhsV2gH3kSx8OLsKqzK7LyvYs6Qe/tSRfbhYxSawJbCK20CNuFpzP0FB1sVGMHPKPAAa5MOY+EPfy/1hz+Rd2N6ZgkvzUDp1WbPWKGGpjNW/YbR1NR4OukRLBxqqClwLiuwNqOMJD0GjsXaZrKCXug+46l6as93moksA3vxMvZbt3iUqifNXDzgPUm/IJL0K9o1EEflfz3ZjwbmKbSqTubXrkCbqAxEcp7WSlzGB82ZxliI7bkbwCX5udiLBqZj+P6MmKHaTRSdvwgDuWLL0GxKZaAB1Q20QtVCDahaqBWqFmpA1UKtkGc8qBsRprqh2ZQ4ObbChW5o/m9EHkudWjOmQqI8Y3IZmhUVydL5C1ZlFCXSdnxmAAAAAElFTkSuQmCC"
            alt="home" />
        </router-link>

        <router-link class="navys-link" :to="{ name: 'mobilization' }" :class="{
          active:
            this.$route.name === 'mobilization' ||
            this.$route.name === 'climat' ||
            this.$route.name === 'incident' ||
            // this.$route.name === 'goodies' ||
            this.$route.name === 'bureaux',
        }" data-bs-toggle="tooltip" data-bs-placement="right" title="Fiches">
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEZUlEQVR4nO3dy44VVRjF8Z10bG0SH0BxqMapmKgoaExMY6JR1AlIHBIcC8i0hiY0PgHqzMvACxp9BFHDS6DScSCxEbEhafybipUwgF1U6Drstfb+fvOTrL36q0uffU6dlEIIIYQQQgghhBBCWARgB/A68DFwDlgHtmjP1rD2voOPgP19N7X/4U8AG6WbF3YZeB+4P9UEeAb4rXS7Rn4Fnk41AN4GrpZu1NAmcCg5A/Y1en2fy3XgleQIeAy4NFsV7doAHklugO9HFvUv8NVw5/sAsJQaAywNa+//IzpzmyH4NjkBXhhZzB/Ai6UzqgFWgYsjvT2XXACfZxbxN/B46XyqgF3AlUx3nyYHwPLItf9o6XzqgOMj9wLLSR2wN7OAfijuK51PHbAC/JXp8NmkDngrE/6L0tlc8P8N8q0cSOqAY5nwJ0tncwGs2V5CgS4TvruD19Ssm7NDGTEAk8UATBiamnVzHkQy4gwwWQzAhKGpWTfnQSQjzgCTxQBMGJqadXMeRDLiDDBZDMCEoalZN+dBJCPOAJPFAEwYmpp1cx5EMuIMMFkMwIShqVk350EkI84Ak8UATBiamnVzHkQyrMOLsO7QOrwI6w6tw4uw7tA6vAjrDq3Di7Du0Dq8COsOrcOLsO7QOrwI6w6tw4uw7tA6vAjrDq3Di7Du0Dq8COsOrcOLsO7QOrwI6w63E77//jvwE3CNelwDfuyflXg3OizuTsMDD408GKEGl4Cdi+zQfQDeoX5HFtmh+wAcoX6HF9lhDZeAmh8suRGXgGkPlT5b4U3gD8DuRR9EEqzDi7Du0Dq8COsOrcOLsO7QOrwI6w6tw4uw7tA6vAjrDq3Di7Du0Dq8COsOrcOLsO4wtoNvEtvBg9gOJraDx84csR3c8iUgtoNvaHUAYju45QEYXhvbwanhAQgVdGgdXoR1h9bhRVh3aB1ehHWH1uFFWHdoHV6EdYfW4UVYd2gdXoR1h9bhRVh3aLgdvA58oPTL5k0OgMC3g08lEa0OQOnt4N+TiFYHoPS3gy8kEa0OQOnt4JNJRJMDUHA7eB1YA+5NIpodgFBBh9bhRVh3aB1ehHWH1uFFWHdoHV6EdYfW4UVYd2gdXoR1h9bhRVh3aB1ehHWH1uFFWHdoHV6EdYfW4UVYd2gdXoR1h9bhRVh3aB1ehHWHwNFM+LXS2VwApzIdvpvUAQcz4b8snc0F8HWmwwNJHbAnE77/uNdK6XzqgJWRT0dP/uGpYoDlkc/2HSudTx3wXqa7P4F7kgPgs8wirgC7SudTBTwB/JPp7pPkAnievIvAaumMaoCXhm5y9iYnwHeMOwO8ATwILKXGAEvD2t8EvrldV8kN8OjwS1lhe/pr/8PJEbAP2NpmAS27DrycnAGHgM3STRra7N9TSTUAngJ+Kd2okfPAk6nCNzhODNe0cGuXh32Aet8wA3YArwEfAj/338pt9D5ha1h738Fp4NWq//AhhBBCCCGEEEIIIYQQQggh3XX/AYEp9zTqvwlsAAAAAElFTkSuQmCC"
            alt="file" />
        </router-link>

        <router-link class="navys-link" :to="{ name: 'votes' }" :class="{ active: this.$route.name === 'votes' }"
          data-bs-toggle="tooltip" data-bs-placement="right" title="Votes">
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAADxUlEQVR4nO2auWsUURzHn7cIUdQoFkFQYxSExHKNgjaCtiuroggmxCKFhUclKdJYGBARBNFYqAhKQE3watw04vofKBYGIcaj82rExI889q2+vMzsm905d3a+MCw775rv93e8Y0aIFADoAX7gDlnWI9IIoBeYwY4/QL9IIoClwDGgQ/1fAOwHCpZrQCMvf0eBEeMaNeoMqLY7RBIALAOK6gG/AXuAMWqDJNZXZYw+By8ZiZapnbzuqoGRryJCvAI4kP9pEPsIHHVw+0e1ktfG7NL6iS8EFPnnGpH3wEbgiiHI7ioJL7lJrQ7yG1TZPDcR0kS+qBGcANYbdaQIV7U634EhI5N7dvuGIl9FBNeYBw4AwzKE9PtGnVbRKOQNEcYt5E9os8Yk0KmXqzq7gM/AoEgI+Xc28g7Tlo18Bb+AW2pRdRJ4YtQ5FCrZmMjL8lfYcQNYKBqAfI+FfL9Bvk+FS68aw8wZL4C9oZINirxq+1VrJ/vYBKwEdgL3DIJDRlspRKdKjHJJvU5EDcrkx+shr9rfxjvkFNktkgIs5IEjwBJLH/OBc1X292/VLi9ZImAnP6juP7aJoOqvAo4Dl4GbwAVgn9oqOy2WupNMfjXwQSv3JIJlzJpFCGUzhMeYBzbHKUIo22Hslj8MLI5bhFAORPAe82MxiRDekRhzycslaLtW3qoONIhYhJe4I5hdJHPJu5HcAkypMrlUbTH6CVQE4Ezox+LMJT9hsbQU4T6w3KW/QEQwyP8GDvrl6jnmFUlXERz6aQkyHKIkX3Q6xlLlHZq7Szx1IgGsUOEwq1zmD7Wfr+CZfFfg4blOaW2m5UozYOplAJdMywsDXjwBeFglXGryhEgsXwFwXhvsE7BVOMAmgpEY6xbBgXxBhAlgkWE9mwhTAYpwN1byhggPtMG/ANuEA1RO0EmYMW+SdMsJ8lVZTrt/OpKYT4gntBvk47G8T0+wWbpqeWIsH7En3DHan02E5SPyhGTFfAyekIvc8pTPy6W6zQbJeVg0KfkKpqUAFUw6fF+T1uvfvkMk6puZiKAfq4tMgP/IPED4d63tHr7t83t1JTIEKL908PLFpl/M+BUhLAEKRIdCGAJM+pxaSlpfF0NwfdlnBSXLs+grSus0OB2ChfJ+LORitXw9HuJlIXQ9YBFeA2tCEGAt8CZAASTna24xnIwtZ4Cw8iMTgJxTEkkL0m5gKzIBsOeAXFOHACmPkUwA0m1gKzIBsOeANm3j0SZShiwHkM0ChVqmwVICjq6Dvko2AfI0D/J+99s0MGadV/wF5DqR91i9TVwAAAAASUVORK5CYII="
            alt="external-vote-voting-justicon-lineal-justicon-1" />
        </router-link>

        <router-link class="navys-link" :to="{ name: 'users' }" :class="{ active: this.$route.name === 'users' }"
          data-bs-toggle="tooltip" data-bs-placement="right" title="Utilisateurs">
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAADUElEQVR4nO2YyWtUQRDGn5pF40qE6NGDiYJ60oAXwZMLol6UqHFDjJgYxA0l/0D+AnHBDVQ0LnclJJfEKBqXu6CiUQ+KETRxAZOflH4v6UzeTHomb2DQ90HDvO7qqurqrq+6JwgSJEiQIEGCBMMApgNNQDfQp9atvmlBIQOoBt6SHj3AsqAQAVQBn+XoPWC1RVzNfndprBeoDAoNQJscbAGKIsaLgJuSaQ0KCcBCOfYJmJlBbpZ2wFCVb6cmALu09WEy2tHYYWMpsvvk1GUPvVckuzdXe74LuJQhGS+kyBrDGJo99DZLtilXez7Ob9fErxYpYA4wF6hTn2GbI1+XxQ5cTd0BsrTns4CQMfZHjNWHTBORA7255ABZ2vNZQL8mVUSMVWisL6W/Vf03M7DQLcncHa+9fCyg0omuRXSNqrK1tcB9h6nm53sBXZpUHzHWoLHOiLFlqrbp8AZYGpe9tABqU5JqhpqbVFvTzLXKewJ4JFlrD4HjwNS47aUFcDFDJM8HMYO47amwGL11OpHsULSyLywFZu/fBH+Z6JjRJPDSuRK8AO4AR1MZKC8AJms7bwCvgG+iOnPqulVFoMSRXwzcBgYYGwOqB4uc+aU6Ki2y16/2Sj7YWKmv8yb83sORd0ANcBj4ob5+JeMmYB5Qpma/N+u+Y8EwfNfcLVnYS89EQDFwzpnw2Eo7sEBOTNGVwUr7s4iongLKPQI0GzgTsVtPpXuhbJXJdr3GQpwdVenFACGN2ZndnSnzJR8+YL4A67y2d6SO9Q7Ht3nY2+NU7JG0KoeRwmoP4/ZEHNTRWZGt846elcBP6VrlIb9cATbsDDttqz6qs9ZDSalzXTiQq/OOvoPS1eOTqHrgGD7YUQu0NYYHngbt1YSuChNjWMAk4MmIqI49x64mhj320Z7lZEtuQ814nQ9h7BISR+AB81Xy7YFzpso9/zpB1+ahOjBeACXZPPbFZH8IxD5ehxEd60g4T8drcTkfQgVy1GM/Feajs2Mv3SRKh6F7ONCY0yPbAwzTeIPTZxe7TPhLIlqEXROi0OEoXCLKM7rdYMUvBseLgY3SOZhyxUi3APO1MVeDp8kfTo43IL60dwR4DvyKwelf0nUoDlpOkCBBggT/F34De29nbXr8bEgAAAAASUVORK5CYII="
            alt="group" />
        </router-link>

        <router-link class="navys-link" :to="{ name: 'map' }" :class="{
          active:
            this.$route.name === 'map' ||
            this.$route.name === 'national' ||
            this.$route.name === 'international',
        }" data-bs-toggle="tooltip" data-bs-placement="right" title="Carte geolocalisation">
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAACXBIWXMAAAsTAAALEwEAmpwYAAAENElEQVR4nO2cTYgcRRTH28QcFk0w5JJo3EXz4SFiIEdz1YgED34sGASvKwQCISa3gJF4iYdg9KLiSQ/53IsbsicFRz3owYteXREDkg/IByZZY/KTB/+WZrdrprq7xunpqh8UDFXvVb3+T9Xr6u7pybJEIpFIJBKJRCIRB8AUcAiYBy4Cd1Ququ4gMDnqOFsHsBH4ArjLYMzmc+CxUcfdCoBp4IbEWQROAq8DTwEPqdjnPWozG+TzWo3xJtu25F4BjgIXgEsqF1T3cr+AgX3AfQlyGnjCY8wngbPyMd+9fWwnFUMxPrIRi/We8tFl/Fkmqs0eCfAPsL9GPAfka3286hKrjOEoVE+syyXC5AfiK/T+BnEeqPjFhRewoljzsjP7qZK+vgN6HmPkeex0gPjPqa/FJfEtSx3BBWwiVhkmHvDNAJt1OthFn5w3CGBTob91A2yDC5hTWay6AG9pzJMDtjVndKa9oVm2pY+9nYCMmZEIGKxDD5STjD19xLtasiquuvZ+wBuyOT/WAuLIgUts/tCwWx3tNvOML00wlTnVnXL42D7R+H3cBex55EC7NDNWO9rzTfV/sw14XHXXHD6r1X57rAX0AbipYdc42q+rfWMFAdeo/WYMAv6iYZ8dsC2ZUz60cl51Zxw+O9X+cww58BMNe8TRvhW4QvlJZLPD513ZfBxDDnxBw/4GrHDY2InjlJbzdZ1YXOKtUF/GrrEW0Acd8IKGfi5Af7vU14LrC+mUgAZwWEOfyxpSyJmHPWzHPwcawAbbcgD3gGeympiv+rC+NnRBwN6gHFiwPa7hZxuMN6s+jnvat1vAKgDrgb90P29HDf8d8rU+1kcnoAG8rxC+yioCfC3fYxV8upEDc4C1hVtq01m15yj5DdNHuiRgzzcHFnxmCvvCCQ/7icK+r+/tq7ETsA7ASuAnhXLUw95uzyOflVnsAhauZW078ne/bQ2wXTZmu9NlF00OLAKcUDg/lM0s4EHgR9mcyGrQyRyYAzxcuMR7u6TdftZh/Gq2WRcFbArwfGFvt6lQvxm4pbba18+dF9AAPiss5VVaut+r7tOsAZ3OgTm2r9OvsYx3VNCzFO89X3Q5sAiwW8v1rop9fjFrSOsFDAnwUR4f8GGgPqMScMKecahMRCEgAXLgkv6ethKwvzhy4LBovYBtJzoBCZ8S2i0g4Q84aEoYBwF7KQd2GNo+A0OTcmBDUg5sGdEt4dBEJyBpH9iMlANbRnRLODTRCUjKgc1IObBlRLeEOy8g5S85e7+xPuzbYyWv2Y5OQCq8EV5CLVEr/mTY+73nbNgCAo8CL+mhtr3096cjmGvAt8AHwJvAtoa+D3jGPfQxKgnoObMu1V2aFWZv2X8rLPUN+pJ4IxyBDP+bqzaLRhKf70EQMuk3xeOk9P/MrLH8E5pEIpFIJBKJRCKRSCSyRvwL6l3heCzz/1AAAAAASUVORK5CYII="
            alt="map-marker" />
        </router-link>

        <router-link class="navys-link" :to="{ name: 'graphe' }" :class="{ active: this.$route.name === 'graphe' }"
          data-bs-toggle="tooltip" data-bs-placement="right" title="graphe">
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAAAsTAAALEwEAmpwYAAAB4klEQVR4nO3cPU7DMACGYav0AhwCcQNmNn5GJq7GWViQKAMj4gLQAAsTDJ2qfChVh0rQNHYT87V+HykTipP4TUhKUEMAAAAAAAAAAAAAAACDkfQg6X64LSCKlpg2EwQxQxAzBCk4iKQLSZXiTCWdh1JkDlIpzWsoReYgC0Ovs9NyHrAStkWQAYkgXmegCDLMJKUSQbabpOZxM/Ex9SxHEEmXkj4i9++9efwOrjYccDO5KV5it5W4f83kpngLrjYccOoE1j2P92sdSQcrEzzqONbqOgfB0X8FkXS9zf4RpP8gIkjEGZghyCdBvIKMCOIV5JggXkHmBPEKIoLscRBJJx3G4nNIS5Cn0G+QP0+ClnX4YKj0K65LkI3jEqT9CjkNHRBk/QQ+m99D7or6lRU5gXXP4/G3rF0LIumqtCtkbh5EpQU5ihiv7jAeQbYJ0pUIku0KeSSIVxD3m7pKu4cQJAeCmCGIGYKYIYgZgpghiBmCmCGIGYKYIYgZgpghiBmCmCGIGYKYIYgZgpghyO4GqXp+pz7t+Z16VdQ79cjx6p7H419Jl5PxvZyP24il8bVmcmeLn0o3EUtjVtwXB6DVJGeQSfu+QHzRdHeSxpIOI5ZxxPAAAAAAAAAAAAAAAABh7/wA11ybpZ1zMy0AAAAASUVORK5CYII="
            alt="analytics" />
        </router-link>
        <router-link class="navys-link" :to="{ name: 'controles' }" v-if="currentUser().role === 'SUPER_ADMIN'"
          :class="{ active: this.$route.name === 'controles' || this.$route.name === 'centre-votes' }" data-bs-toggle="tooltip" data-bs-placement="right"
          title="Controles">
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAAAsTAAALEwEAmpwYAAAE4klEQVR4nO2cz4scRRzFS6OgJgoqRA9G9OAP9KTiQRE0evZuclfxD/DHSfSsrHoIwbsKij8OevMguGty8UcgSlYwJtdxFpnu97oXNG7JF/sg3T09MzrZrvftftCwbHdVf6pfTU/P66oKYdSoUcKKMV5VFMVDAI4DeJ3kBwBOkzwH4CLJ3wH8YVv198Vq3+nq2NesrNVhdfXdHkmVZXl7nucvAPiM5IxkXNM2A/Cp1V2W5ZG+25m88jx/jORHAP5cowmtG4C/SH5ZFMXTMcYr+m57UgLwFIAzl9uEDnPOAHgyDF0xxusAvLvERfsNwOcA3iD5bJ7nj+d5ft/u7u4ds9nsxhjj1bbZ3/Y/2wfgCTvWylhZq2MJY07GGK8NQ1SWZTdXX7zzLs63JF8k+UCM8cr/ez6rg+SDJF8C8F3Heb+ZzWY3hSHJemGbGQD2SH5YluUjl5shy7JH7VzVORumDOqTQvKdlt55zm5F+81S3dq2W3jeCkNQnuf3Vk84/27819Pp9Pq+mHZ2dm4guVl/Csuy7O7gXSTfrpnxS4zxYN9cMcaDAM7X2DaCd5H8qdYTnwmJCMCxmiFng3cBKGqGHA6JCMDhGhuDd7U80dwSEhHJW+t8YYCGHAuJCMDx0RDg/GQyOdS3GZPJ5BCAXwdvSHUBtuzRM/RoBsmv2n65B+/qyJK27UfafvMAOEry53lcwbsWhHt7FmdYrNFndDIa0m7O9yRfrt70rSVctLpIvgLgh2Wj+eBdLY3eAHBpwYWZAviC5JtFUTxntzYA98+J3++0fXYrsmOtTFV2uuDTaQwbgzfETCqK4uHqExH72OzcxtDWYYJ3dTU4T+AV7mhIi8qyPFIUxfMkP7GRJGs0wur62OouiuK2VTuMS63a4BjjAXtraCEkyVdJvg/glIWUAC60DAO6UO2zY96zMlVZe/N4YN188mq5dYxZVmKGjFlWYoaMWVafmvNlO2ZZfanjCWh7zLLSMiSOWVZihrD263nMsvoxZMyyUlNKWdaoxLKsUYllWaMSy7LkpT4HMIrzu5gDWIrzu/nSzcX53cwBhDi/mzmAUZzf1RzATJzf1RzAKM7vbg4gxfldzQHMxfndzQGkOL+7OYAU53c3BxDi/A2pj5uiOH/wNm6K4vzB27gpivM31PK8LDVuiuL8YckGyYybojh/8DZuiuL8DXUVVhg3RXH+htTHTVGcf6EhqY2b4oqGqPEvZUhKr0D5HwxR4l/JEIU5gBTndzcHkOL8wVsWRHH+4C0Lojh/8JYFUZy/IfUsiOL8DalnQRTnb0g9C6I4f0NdhRWyIIrzN6SeBVGcf6EhalkQxfmXMkQpC6I4/0qGKGRBFOcP3rIgivMHb1kQxfmDtyyI4vzBWxZEcf6G1LMgivM3pJ4FUZy/IfUsiOL8DXUVVsiCKM7fkHoWRHH+hYaoZUEU51/KEKUsiOL8KxmikAVRnD94y4Iozt+QTUQUyoJyb/xthX4UyoLOeuMPiybeJ54FbXjjbyjLsntalqbY7DML2vlnaYqt2oW+lGXZXd74W9WyPEWKWdCGV/55yxudSjgL2ooxXuOVv1W2yFZboxLIgjYtwvDO39XTTnZUvp9Z0B7JE6v0LHX+ubIFHBNYRPLoUPnnKoUsaMj8btdmL8X5Xa/NHsX5R40Kg9Lfzjq1yB1YA40AAAAASUVORK5CYII="
            alt="big-data" />
        </router-link>

        <!-- <router-link class="navys-link" :to="{ name: 'tendance' }" v-if="currentUser().role === 'SUPER_ADMIN'"
          :class="{ active: this.$route.name === 'tendance' }" data-bs-toggle="tooltip" data-bs-placement="right"
          title="Tendance">
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAADf0lEQVR4nO2bS0hUURiAb5ilvSCj0ggikmhZYRbRJqIoyaJVm4IWQVAtYlpEGx+hEASB0KJJ2hSR5iJaR2UDQYmLNr2s0WwTTanZg7KHX/zMkS63Qe+9c86ce3M+GBiGmfM/9Jzzv67jFClSpIhBgBKgFjgJtAMpoB8YBn4AY+q9fHZffSehflPixBGgFNgDdAEfCY/89oZaq9SJOsAioBnIoB9ZswmocKIGMAdoAT5jnk/AGaDciQLAbmCAwiNnRp1Nw2cDbcA4dkmKLoU2vgroJTr0AJWFMn4l8JLoIVtitWnjq4G3RBfRrdqU8UuAPqKP/CdUmTjweokPPVoPRuAC8aNN5z0fR8bzjhOAcrWn4sprYG4+Dmgh/jSHNb5Cxd1xR2xYGMYBzRqVeB9Q9jL00hgmn89oVOC5ZQdkAtUTgL2aFUhZdoBQH0SBLs3Cb3rWPwqcmuTVin46g9TwRjQLT3pkfKHwjPiqMQIbDQhvda0/D3vU+HFAwoDghGv9VdjjhB8HtBsQfNC1/mb1mWyDB8A94CnwG/Mk/TggZUDwLtf624FjQFmOdPs0MIo5uv04YMCA4A1TCv4rfw0wiBn6/SgwZEDwCr8OUDqsV10j3UwdkZJtVemmHpjhklEGHAGuAleAA94rCrhsQI/vthwgPAOOA2slNOZfbrmdAGzCkgM+YI/DLj1mGgiYfG2BAexxx6PLYxuHYAp7vPHoctfGNdiOPdKG/xhJW6GwX657dMl1WBoPhWsxw+AUjdRvckN4SnK/bCRDJQbS4Z8qwtsC3M7hiDSwzaPHIc06DPseuSE7lqKTSzni/h3APmBdjiBISnIvNOvQ4ct4Qc3k6OKrlLicAAAXsVwSK9VYFJXttN+n3AXANfTzLvCQFdmBJJ08UenuVmA5MF9Fe5Wy/4FzBs6eCRoCGf+fNUZGQzVGBDWNFXeCNUVyNEflioorr7yVp8AAdRGYBAuD6LwzL+MnUONwceO8owtglho7iQuPRGdtDhCAxQaiMxOkjc0MMp3H5DyDkn3TclByAhW9RelMeAgsdQoJ2TD2bESGpfUeeCHihH5LQY6eez5fVMTYVKDcQWL7xsg8MOFGkg6lXMZQStsQOrEpJGTrCdIO68wzxZUyVodaK/oPTU1SY6yRiqw6sLpVsDKk2nBj6n1azQok1XdrYvvYXJEiRZy48AeSTFOrOCgnrwAAAABJRU5ErkJggg=="
            alt="Top 5" />
        </router-link> -->
        <!-- <router-link class="navys-link" :to="{ name: 'VoteInternational' }"
          :class="{ 'active': this.$route.name === 'VoteInternational' }" data-bs-toggle="tooltip"
          data-bs-placement="right" title="Remomte International">
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAADD0lEQVR4nO2YzU4UQRDHJxoxkbiLmBgwGh/AF1D0YDyCMYr6CHoAOYkeMJ70JPoqXlUED36tRvCgoFHwKyYeiWEhUS8/U1CdHSfTM907O8uszi/ZA909XVXdVf8pJghKSkpK/kuA7cA4MAv8AOrADHAO2Bp0CkANO0vARWAfUAUGgVfAdFA0aDCozorToxqElaBoYHFM0krTaxpYAZaBu4UPBJgD1tJqpBMCca2RdYKiQVFqhHj5lLw+6yKfHjWypun31/oY+9+BO8AQsKWV8jkG7LfJZ2jtPS1orxpJsb/oLN8xqXEAmEhKi4gjmWokxr7hCwn4pIZhSq88Vj41dWY9a+RZwg0Z/OTbNuE7HrMu6ogcxkvgktRFWiCBfd/2BuJKGcg/fyM05FNy+X4zgQAV4JpK5Kr+aqpcXUmO0bBv8GtxSGdCJTmxxQAOAt8S9pHg9ubW4hAvn2Ou8ql7yHOfde4JcAzYAewETgHvdG4uejNZ5TsVaQ+0TXmQJJ+61rxAX0fndL4aCmY03XrgLN8tRdNGOJmw5rSuqQVFhY2GUNiTsEaEQFhpt3O7gNvAV+C39j63gJ4mA6naAsHDlm8QYnTBUmgyXm0itYYThGLB1ZZvIHIawlvgENANHNa/hUnPYu8B3uuakSy2vADmdZMjkfGjOj4fk/9Gfp8Cx9Whit6ECUJkdlsWW17oG1nojoyLc8Kq5YUoOW5DguhvhS1nHE7pjeU5eQFeVafr+pMbGoneRFZbTkhehvJ2QE9nIJS3N9122mRbbCiJOakoMl5pYSD52lKlmdQi/gV8ktMxcqhfPy6InEa61jSWNd3Om76LFFu5IV0s8ILs1OIEoC3IKQLP1ZEPwBmg1+P5Xm1GF0PBdOXh6An9LmVk0caSTwAxdnYDH1Ns1NWXId/Nb3ikxXCzQYTsyW26ct3nJoSf+gkzNnf1lGiFcoU64rplvh+4rD7hdDPAQ108nrJunQz+e+8HXNFlMy4bmpPuy2o4h0D6nP+XcXVwMwLxskuHEDgE8pji8yg1kJKSkiDMH8a0PfI+UGvIAAAAAElFTkSuQmCC"
            alt="national">
        </router-link> -->



        <!-- <router-link class="navys-link" :to="{ name: 'climat' }"
          :class="{ 'active': this.$route.name === 'climat' }" data-bs-toggle="tooltip" data-bs-placement="right"
          title="Climats">
          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAD90lEQVR4nO2aa4hVVRTHf46PMC8+MiEr0TCdZvBREk1B9cHAJCqIKJnJB0ERpkYPQ/ykYCgEmTCaRoiVkmEgMkNoEErEiERpjhV9GGvU8pUK5iOfc2PB/8LB7j337H32ufcG84fDHOas9V97nb3O3mutfSEd+gEPAG8CnwAdwB/AGeAacF33x4DvgC+ApcATwFBqAE3AOuA0kPe8LgM7gFnAgEo78DCw64YB/QSsBV4EHgXuBIYBfYE+uh8p558HlgM75UiB4yiwQDOcKQYDHwE9MvwXsAyoT8FpoTVbIRd9KZPJCPcAv8rQRWAxMCiwjceBX2TjH4VbUEyOfAc/AHeTHW4CWmXLZn5eKGIb9EkRbwUGUhnM02pn17NpySx0OuVEO9CfyuIN2T4HjE1DtCry8eWoDj7VGL7R6ueMKdrMrgATqR6GAMflzHM+BO1SftdzABaGjwFLNLPva+dv9OB6S2PpdJ2VCVoxLDZv9TDcAhyK2c2/BEY78N0cmZWpLgNZKaXV7j7wunRP6v4upR62sz+lWLfnJ4AGB94l0vsgqYJN3Z9Sut/Rifv0TVlyOKaETB2wSfyWXCbFxEgaYxyJNj9TOIw7tki3OcEHfEqykxz4u6TzUBLh+RJejxvsLZ3VbFqiWA4bZOcVBxut0rGQLYv1En4VNzRIb1tC+RWSX+Rg4yXpfJxE+Fuf1UHTbaE1N6H8Ztl5wcFGk3T2JRHu9ohdVwwHzmthuMNBL6fcy/TGlRP+W45YYZQFbFX8XDasEHPFRum2lRO8KsGsstx3xL9fG50rbtdGbRzT4gQvSMjHSDksFfdvGpAvFovn57iyuJBajCIsCvnS7zGbpUvx1SW+10oJ7ZXAvYTDVGXS3QGcKOBpjfNMqXxwqwQs8QuF78Vp3ZeQ2BGXfy3UwzWBjN2iTPqob2FUZhO+otn+T830oBw5QBg8Ir7dZIOV4v+sWEFUSOhC9JaeFJeFQRaoF//BYg/fCxhe/VWLZFHzNwJfaaz2t2gzrkfZ7AhqD43K1a5HOp5WCxVFm4Q+TGn0ZSWTWwJ13jdHHLiofsBtcQqWlF3SimAdFV+sjdTqsQYTIq9rlZriTjVDR4qlMytHnJCL1O8zqY3Qyvs4ggofUzxShZZpUEcspH6Ush3Q/G8dQQ2CvE6Yqok6jcNWLS/kVDn2OJamoTEy0tvyRlvCnlWWeEZjsPNLb7ydos4Ohe0ufa1qZbHl0BxJRyx3S3UEl1eJWWm06HDU7M9JSzZERJZIhsYMYLp+PWEvzBoT4/X/ryNLrnVgqr+GJ+AtdZ1y7EgmNhgaBd49KpAOK4Tb9UuI4LVM1o5UDPleR+LROyO+qPnQ+hdcGlDSHG017AAAAABJRU5ErkJggg==" alt="mental-state">
        </router-link>

        <router-link class="navys-link" :to="{ name: 'incident' }"
          :class="{ 'active': this.$route.name === 'incident' }" data-bs-toggle="tooltip" data-bs-placement="right"
          title="Alerte et Incident">
          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAELklEQVR4nO2ZS2yUVRTHf4ZpjRRUsIC6U9OIkkDksZMlL7G6MWiqWLeiFmFBIAQKS8IjbEkgNoGIkLAg8YFujILBFyAQSBB0KSBFW0oESmDMIf9LDpc7beeb6QyQ759MMvnfe+6c833ndc9Ajhw5cuR4ADAFWArsBo4C/wD9+tj337S2BJjMPYbRUv4kUCzzc0JGjRpuJduBf4G5ibWClLjoFPsL2AosBKYCTwAN+jQD04B3gW3AWSfXDSzWmTFeBfqkSybMA64DN4FXorXngcNOkW+B+cCIMs4vSMnv3DmHgJaEIUW555xyjXgW6NUBndFaK3BJa78Ds6kc9tDO6MxLeigea7TWAzwz1EPNDX6S4KfR2jt6S7bWBTRRPVicbNfZ9httbu0hYJfWDpZwwbuwVAJ/AI9GbyIYsYrhQ6dzJe/SjwF/au3jwQ550rnUrCgm+jIY8YPz//0ZjOmNYmauc7HxAx2wXhv3OK7gAtvcqRzE6bYc7JDMr1ES2St+XSnBMQq0mypsAUtcYDfV0JBRLgF85PiXpKPp+nhKcJGE9kXFLtSJslNfhYagGDG5C9FD/Fr8+yRwUIsLEoFvdYI6GGL4PhHgb4k7QIQJel0W0I84PrQdcV6vpSGtkj3uuJHAZek8zm9eoM1fOW6KazuGlLeHyZACcE7ykxLu9YbfvFnkioRbWe9EHQ0xfCJ568cCVorb5Lhbb6Ko1xiwW5w1gPU2pF3ynznudXFf+I2nRVrhCzgqzrrYehsyXfJHHPeCuFN+Y7fIsQnOWvF6GzLOpeGA5gTHNZGNg3D1MuRhyV8dhLvVoBXV+d4vhjSKMz1vo0ekdZj3i2uNEWezgLuCfWIi2O16mhX7nRFWobNiRiLYX0wF+zci7aYWEC4ydseuN96TLjsTV+B9qYJoRaaaBbFa6JIuHY5bLW6j39gm8nPHTRZ3toIWpRpoAM5LF3OnuIi/6Tc/pQbsPzVkASe02V5jvfCadDjmOGvprwA31PDegTBwaEtcqmxkkwVZr7oeBxJ91tvifiSBDi3+HN3SuhOJoFbpt1Vyf0cXq1/Ef5gSGivXsg0vO36xuDMZRpuVGDLaTU0+cPxMcZdLXXV99vIdZUETwKLmTrWqIzudh/jhw5ep9j3G027s47NBi5suxpPH4cBa/ZZ1HM8lrrh9SlADYrk2n1eHGTDfDeg6a2BEfzQ8b1as2NqyoRzU6FxpS7TW5hrMHVX+O8BiIrhTv56+xxY35/LN7YCYKOs3lBjR9LoEEE/qyZidQmD3lPgbY6O8xPeDFaNFT8YHcmuZHUCDil2oEyGwfUzUBCM0AbzgFDmnQUG7rqfNctVGfZ+hBrDLtR2hTliKLef/laqjScOz44m6MdjnmOpUNf+eqAomSbFdujtc1A3umjqEI5qEdEQNYI4cOXIwJPwP/dyzMCq1Rg4AAAAASUVORK5CYII=" alt="break--v2">
        </router-link> -->
      </nav>
    </div>
  </div>
</template>

<script>
import { useAppStore } from "@/store/app";
export default {
  mounted() {
    console.log("Current User", this.currentUser().role);
    // this.centreVotes()
  },
  methods: {
    currentUser() {
      const appStore = useAppStore(); // Assurez-vous d'importer correctement useAppStore
      return appStore.currentUser; // Récupérer les informations utilisateur
    },
  },
};
</script>
