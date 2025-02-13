import DOMPurify from 'dompurify';

function SanitizeInputs(value)
{
    let sanitizedValue=DOMPurify.sanitize(value);
    return sanitizedValue;
}

export default SanitizeInputs;