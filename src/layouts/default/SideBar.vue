<template>
  <div class="sidebar-container">
    <div class="sidebar">
      <nav class="navys flex-column justify-content-center">
        <router-link class="navys-link" :to="{name: 'Home'}" :class="{ 'active': this.$route.name === 'Home' }"
          data-bs-toggle="tooltip" data-bs-placement="right" title="Accueil">
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAABnUlEQVR4nO2WzSsFURjGfyRSvlIsZGHHRtnYKQul7OzYsbK240+wtbS1UkpKllIXKZGVjWxsJFKU7sLXq6lzbtPp3u7MNXfOmbxPPTU1zTnv733nPDOgSqQR4Ng4ui6k5oAXQIxfgXkKpBZgDfiOQVj/ABtAK4GrB9irAuD6EOgnUE0AdwkgrO+BSWcNqeHctASUU0BYl82zVqvAhw+QDmCzAQDX20CnWXMKeMgTZBg4zwDC+ioW0QPAUR4g08BjhhDWz8Cs2aPNJFyUdE2L1q8mQFhHa6+bvSItZA3RDew2EcD1AdCXNcQYcJMjhBjfAuNZQSwC7x4gJBbRy38BsIdNAvEW0J4WYtCJv1B8Cgwlhaj2QQrJT8BMPYiVGr8IofnTfAZsRFfUBewEUKCk9D7QGwe5MDfeAihOEtrWGtVe0RlwDYwGUKAkdFTrJVCqdU6kIK4r3wWKgjjy3WnRiTjy3WnRiTjy3WkJYSJppSD47pJOBD0j6KuVQppa+O6STgRNLfTVSiFNLXx3SSfCP06tkwKAlBrYS6WiAf0C5nGBCW1kgjgAAAAASUVORK5CYII=">
        </router-link>

        <router-link class="navys-link" :to="{ name: 'mobilization' }"
          :class="{ 'active': (this.$route.name === 'mobilization') || (this.$route.name === 'climat') || (this.$route.name === 'incident') || (this.$route.name === 'goodies') }" data-bs-toggle="tooltip" data-bs-placement="right"
          title="Fiches">
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEPElEQVR4nO2dy25WVRiGn6QBKQkXgDIE4lRIREQgJqSYaERwghKGBMeAMu3QBPAKOMw4DACR4CUoEG4C1IaBxAJiJSnW7GTPdO22P/273nfv90m+Ic27nv3xr9N/gBBCCCGEEEIIIYQQxsR64CBwCXgAzADzwMLAar4de+PgIvBZ66a3NIM7DcwKyFet58C3wAZ6xvvArwKCXeoX4D16wlHgbwGpbjUHHMGc/QOd3xdWqF4Bn2DK28BTAYnuNQtswZAfOwb1D3CzXfluBCYYHhPt2Jsd0a1FmuA2ZnzYMZjfgX21AwoyBTzp8LYHI64VBvEn8E7tcMJsA14U3F3BhLUdc//J2uEM+LpjLdC4lWd3YQBNU6yrHc6ASeBZweEuDPiyEP567WBG3Cw4PIwBpwrhz9QOZsRZ5yl0uhB+eoR/0+eaXmGHMqQBSAPkFYC8AmQKIFNA1gBkDZBFIFkEZhdAdgHZBpJt4HK3jn2u6RXeSsuQcwDSADkHIK8AOQcgU0DOAcgaIOcAZBGYcwCyC7DYwogwuG1g6JFD6/AiWDu0Di+CtUPr8CJYO7QOL4K1Q+vwIlg7tA4vgrVD6/AiWDu0Di+CtUPr8CJYO7QOL4K1Q+vwIlg7tA4vgrXD1wnffP79HvCy8Dcc6yVwt/2uxNVwWJ1Rw2/q+GKEPtRT4K0xO5Rg1PBfCTykhTHX8TE7lGDU8McFHtDCmOvYmB3aTwF9/mLJ2UwBi9MslH7u4SLwJ2DnKvwnksA6vAjWDq3Di2Dt0Dq8CNYOrcOLYO3QOrwI1g6tw4tg7dA6vAjWDq3Di2Dt0Dq8CNYOcx3Mf04Ccx2c62ByHbzIK0eugwc+BeQ6eOANkOvggTdAQ66DB94AoQcOrcOLYO3QOrwI1g6tw4tg7dA6vAjWDq3Di2Dt0Dq8CNYOrcOLYO3QOrwI1g7droNngO/Eftl8kA1Q+9PB59BhkA1Q+zr4MToMsgFqXwf/hg6DbIDa18Fn0GGQDVDrOngGOAu8gQ6DbYDQA4fW4UWwdmgdXgRrh9bhRbB2aB1eBGuH1uFFsHZoHV4Ea4fW4UWwdmgdXgRrh9bhRbB2aB1eBGuH1uFFsHZoHV4Ea4fW4UWwdmgdXgRrhycL4Zs797A0zhUcnsCALwrhb9QOZsT3BYeHMeCDQvjm7V6TtcMZMNnx7ujl/PBUNdZ2vLfvVO1wBnxTcPcHsAYTrhYG8QLYVjucMNuBvwruLmPE3sIgmnoCTNUOKMhHrZuSt92YcadjME3dAg4BbwITDI+JduyfAz8swZUdW9tfyuoaWIpFHTRz/2ZM2Q/M50EzaqO/Aj7GnCPAXJqA5T78ufZMpRfsAB6lCVjqw38IvEsPDzhOt3Na5n7+18Hz9ry/1wdm64EDwAXgfvup3CGuE+bbsTcOzgOf9v3BhxBCCCGEEEIIIYQQQgghBFaXfwFL9O6aEUbpoAAAAABJRU5ErkJggg=="
            alt="file">
        </router-link>

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



