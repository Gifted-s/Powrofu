import React from 'react';
import {
    Form,
    Input,
    List,
} from 'antd';
import { EnvironmentOutlined } from '@ant-design/icons';
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
        requestOptions: {},
        debounce: 300,
    });
    const ref = useOnclickOutside(() => {
        // When user clicks outside of the component, we can dismiss
        clearSuggestions();
    });

    const handleInput = (e) => {
        // Update the keyword of the input element
        setValue(e.target.value);
    };

    const handleSelect = ({ description }) => () => {
        setValue(description, false);
        clearSuggestions();
        getGeocode({ address: description })
            .then((results) => getLatLng(results[0]))
            .then(({ lat, lng }) => {
                setValue(`${value}Lat: ${lat}° Long: +${lng}°`)
               
            })
            .catch((error) => {
                setValue(error.message)
            });
    };

    const renderSuggestions = () =>
    {
        return (
            <div>
                <List
                    itemLayout="horizontal"
                    dataSource={data}
                    renderItem={suggestion => {
                        const {
                            id,
                            structured_formatting: { main_text, secondary_text },
                        } = suggestion;
                        return (
                            <List.Item  key={id} onClick={handleSelect(suggestion)}>
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
            </div>
        );
    }
     

    return (
        <div ref={ref}>

            <Form.Item

                name="location"
                label="Enter your location"
                rules={[
                    {
                        required: true,
                        message: 'Please type your location here',
                        whitespace: true,
                    },
                ]}
            >
                <Input disabled={!ready} value={value} prefix={<EnvironmentOutlined className="site-form-item-icon" />} onChange={handleInput} placeholder="Enter location here" />
            </Form.Item>
            {status === "OK" && <ul>{renderSuggestions()}</ul>}
        </div>
    );
};


export default PlacesAutocomplete
