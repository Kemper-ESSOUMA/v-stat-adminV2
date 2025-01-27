var simplemaps_countrymap_mapdata = {
    main_settings: {
        //General settings
        width: "responsive", //'700' or 'responsive'
        background_color: "#FFFFFF",
        background_transparent: "yes",
        border_color: "#ffffff",

        //State defaults
        state_description: "State description",
        state_color: "#88A4BC",
        state_hover_color: "#3B729F",
        state_url: "",
        border_size: 1.5,
        all_states_inactive: "no",
        all_states_zoomable: "yes",

        //Location defaults
        location_description: "Location description",
        location_url: "",
        location_color: "#FF0067",
        location_opacity: 0.8,
        location_hover_opacity: 1,
        location_size: 25,
        location_type: "square",
        location_image_source: "frog.png",
        location_border_color: "#FFFFFF",
        location_border: 2,
        location_hover_border: 2.5,
        all_locations_inactive: "no",
        all_locations_hidden: "no",

        //Label defaults
        label_color: "#ffffff",
        label_hover_color: "#ffffff",
        label_size: 16,
        label_font: "Arial",
        label_display: "auto",
        label_scale: "yes",
        hide_labels: "no",
        hide_eastern_labels: "no",

        //Zoom settings
        zoom: "yes",
        manual_zoom: "yes",
        back_image: "no",
        initial_back: "no",
        initial_zoom: "-1",
        initial_zoom_solo: "no",
        region_opacity: 1,
        region_hover_opacity: 0.6,
        zoom_out_incrementally: "yes",
        zoom_percentage: 0.99,
        zoom_time: 0.5,

        //Popup settings
        popup_color: "white",
        popup_opacity: 0.9,
        popup_shadow: 1,
        popup_corners: 5,
        popup_font: "12px/1.5 Verdana, Arial, Helvetica, sans-serif",
        popup_nocss: "no",

        //Advanced settings
        div: "map",
        auto_load: "yes",
        url_new_tab: "no",
        images_directory: "default",
        fade_time: 0.1,
        link_text: "View Website",
        popups: "detect"
    },
    state_specific: {
        GA1: {
            name: "Estuaire",
            description: `
              <p><strong>Candidat 1 :</strong> 200 votes</p>
              <p><strong>Candidat 2 :</strong> 121 votes</p>
              <p><strong>Candidat 3 :</strong> 10 votes</p>
            `,
            color: "default",
            hover_color: "default",
            url: "default"
        },
        GA2: {
            name: "Haut-Ogooué",
            description: "default",
            color: "default",
            hover_color: "default",
            url: "default"
        },
        GA3: {
            name: "Moyen-Ogooué",
            description: "default",
            color: "default",
            hover_color: "default",
            url: "default"
        },
        GA4: {
            name: "Ngounié",
            description: "default",
            color: "default",
            hover_color: "default",
            url: "default"
        },
        GA5: {
            name: "Nyanga",
            description: "default",
            color: "default",
            hover_color: "default",
            url: "default"
        },
        GA6: {
            name: "Ogooué-Ivindo",
            description: "default",
            color: "default",
            hover_color: "default",
            url: "default"
        },
        GA7: {
            name: "Ogooué-Lolo",
            description: "default",
            color: "default",
            hover_color: "default",
            url: "default"
        },
        GA8: {
            name: "Ogooué-Maritime",
            description: "default",
            color: "default",
            hover_color: "default",
            url: "default"
        },
        GA9: {
            name: "Wouleu-Ntem",
            description: "default",
            color: "default",
            hover_color: "default",
            url: "default"
        }
    },
    locations: {
        "0": {
            name: "Centre de NTOUM",
            lat: "0.383333",
            lng: "10.45",
            parent_id: "GA1",
            type: "marker",
            color: "#3242C5",
            size: "40",
            description: `
              <p><strong>Nombre de bureaux de votes :</strong> 10 bureaux</p>
              <p><strong>Nombre de participant :</strong> 200 inscrits</p>
              <p><strong>Nombre de votants :</strong> 196 votants</p>
            `
        },
    },
    labels: {
        GA1: {
            name: "Estuaire",
            parent_id: "GA1"
        },
        GA2: {
            name: "Haut-Ogooué",
            parent_id: "GA2"
        },
        GA3: {
            name: "Moyen-Ogooué",
            parent_id: "GA3"
        },
        GA4: {
            name: "Ngounié",
            parent_id: "GA4"
        },
        GA5: {
            name: "Nyanga",
            parent_id: "GA5"
        },
        GA6: {
            name: "Ogooué-Ivindo",
            parent_id: "GA6"
        },
        GA7: {
            name: "Ogooué-Lolo",
            parent_id: "GA7"
        },
        GA8: {
            name: "Ogooué-Maritime",
            parent_id: "GA8"
        },
        GA9: {
            name: "Wouleu-Ntem",
            parent_id: "GA9"
        }
    },
    legend: {
        entries: []
    },
    regions: {}
};
