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
          :class="{ 'active': (this.$route.name === 'mobilization') || (this.$route.name === 'climat') || (this.$route.name === 'incident') || (this.$route.name === 'goodies') || (this.$route.name === 'bureaux') }"
          data-bs-toggle="tooltip" data-bs-placement="right" title="Fiches">
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEPElEQVR4nO2dy25WVRiGn6QBKQkXgDIE4lRIREQgJqSYaERwghKGBMeAMu3QBPAKOMw4DACR4CUoEG4C1IaBxAJiJSnW7GTPdO22P/273nfv90m+Ic27nv3xr9N/gBBCCCGEEEIIIYQQxsR64CBwCXgAzADzwMLAar4de+PgIvBZ66a3NIM7DcwKyFet58C3wAZ6xvvArwKCXeoX4D16wlHgbwGpbjUHHMGc/QOd3xdWqF4Bn2DK28BTAYnuNQtswZAfOwb1D3CzXfluBCYYHhPt2Jsd0a1FmuA2ZnzYMZjfgX21AwoyBTzp8LYHI64VBvEn8E7tcMJsA14U3F3BhLUdc//J2uEM+LpjLdC4lWd3YQBNU6yrHc6ASeBZweEuDPiyEP567WBG3Cw4PIwBpwrhz9QOZsRZ5yl0uhB+eoR/0+eaXmGHMqQBSAPkFYC8AmQKIFNA1gBkDZBFIFkEZhdAdgHZBpJt4HK3jn2u6RXeSsuQcwDSADkHIK8AOQcgU0DOAcgaIOcAZBGYcwCyC7DYwogwuG1g6JFD6/AiWDu0Di+CtUPr8CJYO7QOL4K1Q+vwIlg7tA4vgrVD6/AiWDu0Di+CtUPr8CJYO7QOL4K1Q+vwIlg7tA4vgrXD1wnffP79HvCy8Dcc6yVwt/2uxNVwWJ1Rw2/q+GKEPtRT4K0xO5Rg1PBfCTykhTHX8TE7lGDU8McFHtDCmOvYmB3aTwF9/mLJ2UwBi9MslH7u4SLwJ2DnKvwnksA6vAjWDq3Di2Dt0Dq8CNYOrcOLYO3QOrwI1g6tw4tg7dA6vAjWDq3Di2Dt0Dq8CNYOcx3Mf04Ccx2c62ByHbzIK0eugwc+BeQ6eOANkOvggTdAQ66DB94AoQcOrcOLYO3QOrwI1g6tw4tg7dA6vAjWDq3Di2Dt0Dq8CNYOrcOLYO3QOrwI1g7droNngO/Eftl8kA1Q+9PB59BhkA1Q+zr4MToMsgFqXwf/hg6DbIDa18Fn0GGQDVDrOngGOAu8gQ6DbYDQA4fW4UWwdmgdXgRrh9bhRbB2aB1eBGuH1uFFsHZoHV4Ea4fW4UWwdmgdXgRrh9bhRbB2aB1eBGuH1uFFsHZoHV4Ea4fW4UWwdmgdXgRrhycL4Zs797A0zhUcnsCALwrhb9QOZsT3BYeHMeCDQvjm7V6TtcMZMNnx7ujl/PBUNdZ2vLfvVO1wBnxTcPcHsAYTrhYG8QLYVjucMNuBvwruLmPE3sIgmnoCTNUOKMhHrZuSt92YcadjME3dAg4BbwITDI+JduyfAz8swZUdW9tfyuoaWIpFHTRz/2ZM2Q/M50EzaqO/Aj7GnCPAXJqA5T78ufZMpRfsAB6lCVjqw38IvEsPDzhOt3Na5n7+18Hz9ry/1wdm64EDwAXgfvup3CGuE+bbsTcOzgOf9v3BhxBCCCGEEEIIIYQQQgghBFaXfwFL9O6aEUbpoAAAAABJRU5ErkJggg=="
            alt="file">
        </router-link>

        <router-link class="navys-link" :to="{ name: 'votes' }" :class="{ 'active': this.$route.name === 'votes' }"
          data-bs-toggle="tooltip" data-bs-placement="right" title="Votes">
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAADp0lEQVR4nO2avWsUQRjGf/GbhSh+YiGCGhNBMJYxCtoI2l44FUUwEosUFmoqSZHGQiGIIIiaQkVQBDXBr8bYiOd/oAgahJionRobMTEyMAvjuLuzdze7O7fZB16Su9mZveeZ92NmdiEf6AamgNkQm5LX5BLHgZkI8r79AXpxFEuAo0Cr/Dwf2A+UDdavkBd/h4F7mg1r1/TLvjtwBB4wKn/gd2APMBJjRlUTxHoi7tET4CVCHKfIq65qk3yYCJkLoJP/qRGbBI4EuP2jGsj7aFfGyTQEBPnnCpGPwEbgsibI7oiE53RSq5b8BtnWFCFCbsiPKgTHgPXaNUKEK8o1P4ALWiavxu0binyYCFEx3wVclyEUhlU0EHlVhBcG8ieUqjEObON/7AK+AAM4Qv5DDPJ62TKR9+0XcFMuqk4CT7RrDpJD8jPA6xjrhSFgAQ1AvttAvlcj3yPDRfR7H5AzXgJ7SRlejeQFvin9xBibgOXATuCuRlBUBxVNMg90ySX1WjKApyWvasgL3KpiGSxKZCcOwTOQPwwsNowxDzgbsb9/J9fxzongGcgPyO8fxxBBYAVwDLgE3ADOA/vkVjlosdTpMvmVwCelPa4IUahFhEQ2Q17MmN+csQiJbIc9A/lDwCIHREjkQMSLGfMjGYmQ6JGYp5EXS9AWbfMxqbSnJcKriJJpbRfpaeTDSLYBE7JNLFWbtXFsi3AmjWNxTyM/ZphpIcJ9YGnIeLZEUMn/Bg6QALyQmG8ziKCj2XI4pEZ+NOQYC3me77u7sKchJJbJcNDbW+R+3u//TD4rMOGU0mdarjQTwcUYdT6OJzy0mBhTmXkf55SbfQa2EAyTCGpirEcEnbwoa4lioTZ7JhEmLIpwJ2vyqggPlJt/BbYSjFaNhB7zOsmwnCAelXUo359OK+Zd8IQWjXxmM1+PJ5hm2tTuzMyn6Qm3tf59rsx8Gp7gXMyn7QkdWcz8kFR3do6Z4Cweqc1J8qoI+B/GA96vyaup+w6ceWUkRajH6hQCUHgAtkJge4x3++o1cbbvZAi0x3xjs16bsSBCIgKUUyxf5SQEGK+ztFSUsQYTcP1BZfyK4beoK0pjGZxOYIZK2EepRg8xLoSuWRbhDbA6AQHWAG8tCiA4Xw2LYWe2nBZh5Fee6wJ0hCSRvCDvE2xEIQBFCFAkQYoqQJEEKaoAgWVwnbLxEP/nDcVKkKIKELsKVBw4urZtFZMApRRPdLK2Ur377dkGtn/OK/4Ccyd5ETrWUU8AAAAASUVORK5CYII="
            alt="external-vote-voting-justicon-lineal-justicon-1">
        </router-link>

        <router-link class="navys-link" :to="{ name: 'users' }" :class="{ 'active': this.$route.name === 'users' }"
          data-bs-toggle="tooltip" data-bs-placement="right" title="Utilisateurs">
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAADJklEQVR4nO2Xy0tVURSHPyu1zB4kWMMGaUI1yqBJ0KgHUU2KMs0kMtLeDwr/Af+C6EFlUEFmzQuxSWZh9pgHKT0HRQaVVuAjlvxO7C7nnnPuvUe51Plgw2HvtfdaZ6+919oLEhISEhISEv5iDtAC9AHf1frUV0qeswp4B4ynaW+BavKUSuCLDH0IrNeOl+q7R2ODQAV5SJcMbAdm+IxbX4dkOskzqmTYZ2BegNx8eWBcHptUCoA9cr13Ge1o1GvMZb+MuhZh3euS3ZeDvkhcDbiMbSmyLepvjbBuq2RtTrb6QqnTxG/aqYXAIqBRfTZW68g3ZuCBGz4eqMtQXyhexGjyGWtyIk3qHRjM8g70ZKgvlCFNKvcZK9eYnVGXTvV3BESh25K5F4O+QLJZsMLZXdvRDcrK1jYCj5xItSQGfYEEubRZY90+Y9XKtuku4xtgZYz60lKbcqnmqrmXaleauZZ5zwBPJGutFzgNzJ4EfWlpC9jJK8RPW9z6ChTeup2dfKDdyiqx5Jm+f5MK4JTCZL/zJHgF3AVO+kSgSWGm3HkLGACGFerMqJu6UEWO/HLgDjAacI69Nqp8sMyZX6yj0i59Q2oDsqFWMpEw4Q8RDHkP7ACOAz/VN6TLuA1YDJSo2fd2vXeGJftDc3dmoK8myPBC4JIz4SlwAFgqI2bpyWCx+oXPrp4DFkTYoDLggo+3nmvtKukqke4mjXlyF/0yfYETxuzMNoTc/AKngPkKbCJzNjsxviuCvr1Oxr6cKtDgJBKra8OwEnFMR2cN2bMW+KW11kWQX60NHledMIG56lMGT9Zip3A/SO4ccQr+KBd1t+Q/6qhNuMY6HkdU6HnLngrTyJ3pwDOtaRVZFHolb7ZzP9UlIXjKLALFRY3WtLWjUC95s/3PmYoSQSqdwsXNA7lSlGGxX+YEEF47Oxp2JLzS0ZJZ3LSnKfZTmeZ4zBIrR0MSiPsOPzQFr9Fmp687xDazB+8n+tMI2YvQY4VCnoXbLUp+uVIIbNWaYylPjHQ/YLYezlbh+QhpP9t2linAwt4J4CUwEoPRI1rrWExhOSEhISHhP+I3exCM/Id5dDAAAAAASUVORK5CYII="
            alt="group">
        </router-link>

        <router-link class="navys-link" :to="{ name: 'map' }" :class="{ 'active': this.$route.name === 'map' }"
          data-bs-toggle="tooltip" data-bs-placement="right" title="Carte geolocalisation">
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAACXBIWXMAAAsTAAALEwEAmpwYAAAECklEQVR4nO2cP2gUQRjFn1GLoAkRGzXxxL8plAgptdWIiIUxAUWwjSAIorETVGKjhfinUbHSQhNNYySpFDzXQos0sTUiBiQxYCIxOWM8+eAtDMfu3uzOXm5vd34wcOzMfN/cu523s7uZABaLxWKxWCwWiyUzbAFwCcAIgAkACywTPNYLIFftQSaRFgBPACwCKJYp0uYxgOZqDzopdAOYpTgFAE8BnADQCmANi3w+yboC20qfrgj5ckmbcp0A+gAMA5hkGeaxY2UGfA7APwrSD2CrRs5tAJ6zj/Q9G9A2xzGo45N+VRXrOv1oSmO6ucVL1C4K8BfA+QjjucC+EuN4gFheJTFiTXkI434RXaGjiKeKGOaHq4iAYcQaYbtO9ivFAZDXyFFQpq0pLxT/VMfnZR2xC2gilhci3lsEs55ftqDpeeXYrsST2EHELqAbMIpYUTnDnHJFDVrWDPBKO8uzbGdA+37G7KmWgMvJMHPKssRPvGmPWTEdsPY7xTaval1Ax8cDVb4x5y6f+gHWv6RgUoZ47JlPn1bWf611AfMaHrjAnA0+9e6iWj3bNvPYT58+Dayfr3UBdfjFnI0+9TOsl6msK2Aj6yV26gX8xJz7yixLhihiC72tyOntxX7Wj2XBAx8w51WfevHGHz4XkR0+fa6xzf0seOAh5vwCoM6nTTMvGDMsAwHi1TGWxOyodQF1kC88zrwHYE4HY40H/CCpElC4zLzid6a4nikxkQUPFDZyybEEoA3RaWOMecZEFjzQ5RZzDyI6g4whsZAGAcOwAcAcn+e1Izzt7DvHWJkTULjJ/K8RnjfseyNEn9R4oMs65ZGavBvRpVt5YNqUJgHzITzQpUdZF9ZrtK9X1n3lHl/VnIBRWAlglOOQR+/l6GPbUfZF1gV072VlOfKnzLJmL9sssQ/SJqAT0gNV7nAsH3zOrFUAPrKNtEUaBcxH8ECXtcot3kWP+l7WfWbbVApoykFlbScvi1zkQcJv1pncP6deQOGRMpVXc+q+57GHMCPVHujSxL/GknFdYSnyXUqYNV/mPFDlCKfrIot8PgxzEi9gnNxTxnc3ppiZErCe7zjGNO9QUiGgE4MHquxhQVYEzMfkgZUi8QImncwJ6MRsCYkX0In5C8dtCYkXMG89MN0Uk34Gxo31QEOsByaMzE3huMmcgI5dB5phPTBhZG4Kx03mBHSsB5phPTBhZG4Kp17AnMcm5zA71ivtgaXbbKsqYC7EjvDSElXUMB4YZt9zxQXcBOAoX2rLpr/vPoORrVfvANwGcBrAbsO+KzTHvRw5Qgmoc2ZNGkzNnEGO0r5xbxI3olitXw76Z1G1xqeF6ZkVN+UuSst2ZtXkP6GxWCwWi8VisVgsFosF0fkPLlqPPjMk9RwAAAAASUVORK5CYII="
            alt="map-marker">
        </router-link>

        <router-link class="navys-link" :to="{ name: 'graphe' }" :class="{ 'active': this.$route.name === 'graphe' }"
          data-bs-toggle="tooltip" data-bs-placement="right" title="Carte geolocalisation">
          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAh0lEQVR4nO3YQQrAIAxE0dz/0nYzq4Agatpp+A+6q9A4DkgjAPzF2HzstBuk6v3XMIgbEnFDIm5IxA2JuN11riXSbpBVDDJBImU7solESEQ4WhN05PaOnN4MbBJpN8gqBhESyThaQkeEjmR0ROiI0JGMjggdETqS0RGhI9V/479eHy4fcrT+AeY3ChPCFMSCAAAAAElFTkSuQmCC" alt="bar-chart--v1">
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



