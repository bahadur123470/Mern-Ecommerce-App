import React from 'react'
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@radix-ui/react-select';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Input } from '../ui/input';
import { Label } from '@radix-ui/react-label';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';

const CommonForm = ({formControls, formData, setFormData, onSubmit, buttonText, isBtnDisabled}) => {
    function renderInputsByComponentType(getControlItem) {
        let element = null;
        const Value = formData[getControlItem.name] || '';
        switch (getControlItem.componentType) {
            case "input":
                element = ( <Input
                name={getControlItem.name} 
                placeholder={getControlItem.placeholder}
                id={getControlItem.name}
                type={getControlItem.type}
                value={Value}
                onChange={event => setFormData({
                    ...formData,
                    [getControlItem.name] : event.target.value
                })}
                />
                );
                break;
            case "select":
                element = ( 
                <Select onValueChange={(value)=> setFormData({
                    ...formData,
                    [getControlItem.name] : value
                })} value={Value}>
                    <SelectTrigger className='w-full'>
                        <SelectValue placeholder={getControlItem.label} />
                    </SelectTrigger>
                    <SelectContent>
                        {
                            getControlItem.options && 
                            getControlItem.options.length > 0 ? 
                            (getControlItem.options.map(optionItem => (
                            <SelectItem key={optionItem.id} value={optionItem.id}>
                                {optionItem.label}
                                </SelectItem>))
                                ) : null
                        }
                    </SelectContent>
                </Select>
                );
                break;
            case "textarea":
                element = (
                    <Textarea 
                    name={getControlItem.name}
                    placeholder={getControlItem.placeholder}
                    id={getControlItem.name}
                    value={Value}
                    onChange={event => setFormData({
                    ...formData,
                    [getControlItem.name] : event.target.value
                })}
                    />
                )
                break;    
            default:
                element = <input 
                name={getControlItem.name} 
                placeholder={getControlItem.placeholder}
                id={getControlItem.name}
                type={getControlItem.type}
                value={Value}
                onChange={event => setFormData({
                    ...formData,
                    [getControlItem.name] : event.target.value
                })}
                />
                break;
        }
        return element;
    }
    return (
        <form onSubmit={onSubmit} >
            <div className='flex flex-col gap-3'>
                {
                    formControls.map(controlItem => <div className='grid w-full gap-1.5'  key={controlItem.name}>
                        <Label className="mb-1" >{controlItem.label}</Label>
                        {
                            renderInputsByComponentType(controlItem)
                        }
                    </div>)
                }
            </div>
            <Button disabled={isBtnDisabled} type="submit" className="mt-2 w-full w-100 mt-64 flex justify-end m-0" >{buttonText || 'Submit'}</Button>
        </form>
    )
}

export default CommonForm
