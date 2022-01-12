import React, {useState} from 'react';
import AsyncSelect from 'react-select/async';
import styles from '../public/styles/ArchitectureSelector.module.sass';
import {ArchitectureOption, ModelType, SelectedModelType} from '../interfaces/Model';
import {setModel} from '../redux/model';
import {connect} from 'react-redux';

interface PropsType {
    readonly alignment: string;
    readonly isArchitectureA?: boolean;
    readonly isArchitectureB?: boolean;
    readonly selectedModel?: SelectedModelType;
    setModel: (model: ModelType) => void;
}

const mapDispatchToProps = (dispatch) => {
    return {
        setModel: (model: ModelType) => dispatch(setModel(model)),
    }
};

const getFlexAlignment = (alignment: string) => {
    if (alignment === 'left') {
        return 'flex-start';
    } else if (alignment === 'right') {
        return 'flex-end';
    }
    return alignment;
}

const getArchitectureList = () => {
        return fetch('http://localhost:8889')
            .then(response => response.json())
            .then(data => {
                const keys = Object.keys(data);
                return keys.map(key => {
                    return {
                        value: key,
                        label: data[key]
                    }
                });
            })
            .catch((err) => {
                console.error(err);
                return [];
            });
}

const ArchitectureSelector = (props: PropsType) => {
    const handleChangeSelect = (value: ArchitectureOption) => {
        const archType = props.isArchitectureA ? 'a' : 'b';
        props.setModel({
            value: value,
            target: archType
        });
    };

    return (
        <div id={`sel-arch-${props.alignment}`} className={styles.wrapper} style={{
            alignItems: getFlexAlignment(props.alignment),
        }}>
            <div className={styles.selectLabel}>
                SELECT ARCHITECTURE
            </div>
            <AsyncSelect
                instanceId={`react-select-1`}
                cacheOptions
                className={styles.select}
                onChange={handleChangeSelect}
                value={props.selectedModel}
                loadOptions={getArchitectureList}
                getOptionValue={(option: ArchitectureOption) => option.value}
                getOptionLabel={(option: ArchitectureOption) => option.label}
                defaultOptions
                placeholder={'Select Architecture...'}
                isSearchable={false}
            />
        </div>
    );
};

export default connect(null, mapDispatchToProps)(ArchitectureSelector);
