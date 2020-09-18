import { Button, IconButton, ButtonGroup } from '@chakra-ui/core'

export function Notify({
  message,
  color,
  onClose,
}: {
  message: string
  color: string
  onClose?: () => void
}): JSX.Element {

  return (
    <ButtonGroup spacing={0}>
      <Button variantColor={color} style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }}>
        {message}
      </Button>

      <IconButton
        icon="close"
        variantColor={color}
        aria-label="Close"
        style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
        borderLeft="1px solid white"
        onClick={(): void => {
          onClose()
        }}
      />
    </ButtonGroup>
  )
}
