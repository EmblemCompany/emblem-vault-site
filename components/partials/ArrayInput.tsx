import {
    useState,
    useEffect,
  } from "react";
  import {
    Box,
    Input,
    Image,
    Button,
    VStack,
    Text,
    TagLabel,
    TagCloseButton,
    Tag,
    HStack,
    Select,
    Tooltip,
  } from "@chakra-ui/react";
  
  function InputComponent({ onAdd, options = [], items = [], type="text" }) {
    const [text, setText] = useState("");
    const [filteredOptions, setFilteredOptions] = useState([]);
  
    const handleAdd = () => {
      if (text.trim()) {
        onAdd(text);
        setText("");
      } else {
        setText("");
      }
    };
  
    const handleKeyDown = (event) => {
      if (event.key === "Enter") {
        handleAdd();
        event.preventDefault(); // Prevent form submission
      }
    };
  
    useEffect(() => {
      if (options && options.length > 0) {
        const availableOptions = options.filter(
          (option) => !items.includes(option)
        );
        setFilteredOptions(
          text
            ? availableOptions.filter((option) =>
                option.toLowerCase().includes(text.toLowerCase())
              )
            : availableOptions
        );
      }
    }, [text, options, items]);
  
    return (
      <Box display="flex" alignItems="center">
        {options && options.length > 0 && filteredOptions.length > 0 ? (
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Select
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Select or type..."
            >
              {filteredOptions.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </Select>
            <Button marginLeft="5px" onClick={handleAdd}>+</Button>
          </div>
        ) : options && options.length > 0 && filteredOptions.length === 0 ? null : (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type something..."
            />
            <Button marginLeft="5px" onClick={handleAdd}>+</Button>
          </div>
        )}
        
      </Box>
    );
  }
  function ArrayInput({ value, onChange, name, options = [], type="text" }) {
    const [items, setItems] = useState(value || []);
  
    useEffect(() => {
      setItems(value);
    }, [value]);
  
    const handleItemsChange = (newItem) => {
      const newItems = items ? [...items, newItem] : [newItem];
      setItems(newItems);
      triggerChange(newItems);
    };
  
    const handleItemRemove = (index) => {
      const newItems = items.filter((_, itemIndex) => itemIndex !== index);
      setItems(newItems);
      triggerChange(newItems);
    };
  
    const triggerChange = (newItems) => {
      if (onChange) {
        const event = {
          target: {
            name: name,
            value: newItems
          }
        };
        onChange(event);
      }
    };
  
    return (
        <form>
          <VStack spacing={4}>
            <HStack spacing={4} >
              <InputComponent onAdd={handleItemsChange} options={options} items={items} />
              {type == "text" && items? items.map((item, index) => (              
                  <Tag key={index} borderRadius="full" variant="solid" colorScheme="green">
                    <TagLabel>{item}</TagLabel>
                    <TagCloseButton onClick={() => handleItemRemove(index)} />
                  </Tag>
              )): type == "image" && items? items.map((item, index) => (
                  <Tooltip label="Delete" fontSize="md">
                    <Image width="85px" key={index} src={item} alt={item} onClick={() => handleItemRemove(index)} style={{cursor: "pointer"}} />
                  </Tooltip>
              )): null }
            </HStack>
          </VStack>
    </form>
  );
}

export default ArrayInput;