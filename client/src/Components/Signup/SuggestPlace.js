// import React from 'react';
import {
    Input,
    List,
} from 'antd';
import { EnvironmentOutlined } from '@ant-design/icons';





import React from "react";
import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
} from "use-places-autocomplete";
import useOnclickOutside from "react-cool-onclickoutside";

const PlacesAutocomplete = () => {
    const {
        ready,
        value,
        suggestions: { status, data },
        setValue,
        clearSuggestions,
    } = usePlacesAutocomplete({
        requestOptions: {
            /* Define search scope here */
        },
        debounce: 300,
    });
    const ref = useOnclickOutside(() => {
        // When user clicks outside of the component, we can dismiss
        // the searched suggestions by calling this method
        clearSuggestions();
    });

    const handleInput = (e) => {
        // Update the keyword of the input element
        setValue(e.target.value);
    };

    const handleSelect = ({ description }) => () => {
        // Get latitude and longitude via utility functions
        getGeocode({ address: description })
            .then((results) => getLatLng(results[0]))
            .then(({ lat, lng }) => {
                setValue(`${description}  (Long: ${lng.toFixed(2)}° | Lat: ${lat.toFixed(2)}°) `, false)
                clearSuggestions()
            })
            .catch((error) => {
                setValue(error.message, false)
            });
    };

    const renderSuggestions = () =>
        <List
            itemLayout="horizontal"
            dataSource={data}
            renderItem={suggestion => {
                const {
                    id,
                    structured_formatting: { main_text, secondary_text },
                } = suggestion;
                return (
                    <List.Item key={id} onClick={handleSelect(suggestion)}>
                        <List.Item.Meta
                            avatar={<EnvironmentOutlined className="site-form-item-icon" />}
                            title={main_text}
                            description={secondary_text}
                        />
                    </List.Item>
                )

            }
            }
        />

    return (
        <div ref={ref}>
            <Input disabled={!ready} value={value} prefix={<EnvironmentOutlined className="site-form-item-icon" />} onChange={handleInput} placeholder="Enter location here" />
            {/* We can use the "status" to decide whether we should display the dropdown or not */}
            {status === "OK" && renderSuggestions()}
        </div>
    );
};


export default PlacesAutocomplete