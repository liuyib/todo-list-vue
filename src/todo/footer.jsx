import '../styles/footer.styl';

export default {
  data() {
    return {
      author: 'Liuyib'
    };
  },
  render() {
    return (
      <div class='footer'>
        <span>Written by {this.author}</span>
      </div>
    );
  }
};
