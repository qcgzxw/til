## kafka Consumer Message返回值分析
```golang
// Messages returns the read channel for the messages that are returned by
// the broker.
//
// This channel will only return if Config.Group.Mode option is set to
// ConsumerModeMultiplex (default).
func (c *Consumer) Messages() <-chan *sarama.ConsumerMessage {
    return c.messages
}

```

通过这种设计，消费者只能读取消息，而无法向通道写入消息或关闭通道，从而保证了系统的安全性和稳定性。
总结
返回只读通道的设计可以：

1. **保证消息消费的安全性**：防止消费者意外地向通道发送数据。
2. **避免通道关闭的冲突**：确保只有生产者可以关闭通道。
3. **明确责任分工**：清晰地分离生产者和消费者的职责。
4. **遵循最小权限原则**：限制消费者的权限，只允许其读取数据。
这种设计不仅提高了代码的可读性和可维护性，还确保了系统的安全性和稳定性。
