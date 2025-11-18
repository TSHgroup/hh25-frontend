import { Link } from "react-router";

export function meta() {
    return [
        { title: "Regulamin - OdpalGadkę" },
        { name: "description", content: "Warunki korzystania z platformy OdpalGadkę" }
    ];
}

export default function TOS() {
    return (
        <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-blue-50 py-20">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-black">
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dicta distinctio molestiae explicabo expedita enim? Molestiae deleniti eos reiciendis animi reprehenderit ratione, illum vitae quam? Dicta doloribus sunt assumenda ex et.
                Odio architecto at dolorem. Nesciunt libero, mollitia illo recusandae vel deserunt asperiores nobis natus quod magni ex ratione autem. Inventore vitae amet doloremque maxime optio rerum quo deleniti animi quisquam.
                Odio, totam, iure blanditiis recusandae facilis ea, expedita rerum voluptatem suscipit ducimus molestias accusamus tenetur. Dignissimos sint provident delectus illo eveniet eum, deleniti quisquam omnis ab quasi rem, praesentium officia?
                Fugiat, assumenda deleniti quidem rerum eos libero quia asperiores facilis eius omnis earum cum laboriosam consequatur sequi ex repellat inventore labore ab soluta molestias cumque! Soluta corporis sapiente illum veritatis.
                Accusamus quos repellendus explicabo eius sed cupiditate, labore magnam adipisci sunt reiciendis ab quisquam nemo officia temporibus. Ipsa molestias ratione mollitia omnis sequi sed perferendis porro, id temporibus tempore sunt?
                Unde autem culpa aliquam minima! Vel dolorum eos vero recusandae amet. Nihil, sed deserunt voluptatem qui ut dicta minus commodi, odit veniam cumque alias modi cupiditate eos accusantium laborum eligendi.
                Dolorem officiis quos, reprehenderit hic in, officia nam quam vitae, cupiditate saepe eligendi quod. Placeat quibusdam veritatis fugit incidunt nobis quo, quis aut labore deserunt illum laborum. Obcaecati, voluptatem sit.
                Magni consectetur ipsam eos ducimus temporibus, modi sapiente eaque facilis harum laboriosam fuga dolores, perferendis, nisi porro. Perferendis ad optio sint animi, iure, omnis similique natus voluptas esse vitae earum!
                Adipisci, quos animi? Dignissimos inventore modi possimus! Exercitationem officia voluptate quibusdam doloribus dignissimos voluptatum voluptas ipsa soluta ipsum? Quo sint praesentium molestias odit. Quod sed earum voluptatibus ullam. Facilis, inventore.
                Incidunt reiciendis doloribus quo beatae accusamus qui sapiente hic architecto autem, quod doloremque modi ad commodi tempora cupiditate ut placeat aut vitae. Ad dolore autem odit labore, illo suscipit assumenda.
                Corrupti hic cum architecto nobis reprehenderit, repellat atque fuga facilis totam corporis voluptatem obcaecati laborum tempora autem ab rem, saepe animi enim. Ducimus facilis cum consequuntur praesentium est fugit numquam.
                Harum ab quis magnam. Minima repudiandae distinctio fugit blanditiis illum aliquid adipisci odit, porro nihil sequi nemo a voluptatem, odio aspernatur in autem animi voluptatum? Illo quo odit cum accusantium!
                Consequatur at sit, adipisci porro enim qui nemo excepturi omnis quae ea facilis quam voluptatem impedit, dolorum, culpa minus expedita in nesciunt! Iure ipsum maiores fuga ipsam aliquam incidunt porro.
                Ullam animi nemo iste, dolores molestias ad porro impedit libero maiores! Odio harum, omnis saepe rem voluptate, optio nulla iure dolores magni minima maxime! Veritatis pariatur commodi minus necessitatibus explicabo?
                Eius provident tenetur in, optio eligendi sapiente ipsa id, excepturi sint magnam eum, amet eaque quis expedita incidunt corrupti facilis voluptate? Nesciunt rerum fugiat totam magni alias, corrupti sunt inventore?</p>
                <div className="text-center mt-8">
                    <Link to="/" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold transition">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
                        </svg>
                        Powrót do strony głównej
                    </Link>
                </div>
            </div>
        </div>
    );
}